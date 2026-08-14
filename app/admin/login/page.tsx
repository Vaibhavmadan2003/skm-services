'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Mail, Lock, Eye, EyeOff, RotateCw } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [captchaInput, setCaptchaInput] = useState('');
  const [captchaCode, setCaptchaCode] = useState('');
  const [accountType, setAccountType] = useState<'super_admin' | 'branch_admin'>('super_admin');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Generate CAPTCHA code (5 characters, uppercase + numbers, no confusing chars)
  const generateCaptcha = () => {
    const chars = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789'; // Excluded O, 0, I, 1, L
    let code = '';
    for (let i = 0; i < 5; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaCode(code);
    setCaptchaInput('');
    
    // Draw CAPTCHA on canvas
    setTimeout(() => {
      drawCaptchaOnCanvas(code);
    }, 0);
    
    return code;
  };

  // Draw distorted CAPTCHA on canvas
  const drawCaptchaOnCanvas = (code: string) => {
    const canvas = document.getElementById('captchaCanvas') as HTMLCanvasElement;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas with white background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw HEAVY noise lines (more visible texture)
    ctx.strokeStyle = 'rgba(180, 180, 180, 0.5)';
    ctx.lineWidth = 1.5;
    for (let i = 0; i < 8; i++) {
      ctx.beginPath();
      ctx.moveTo(0, Math.random() * canvas.height);
      for (let x = 0; x < canvas.width; x += 12) {
        ctx.lineTo(x, Math.random() * canvas.height + 5);
      }
      ctx.stroke();
    }

    // Draw MORE noise dots
    for (let i = 0; i < 50; i++) {
      ctx.fillStyle = `rgba(120, 120, 120, ${0.15 + Math.random() * 0.5})`;
      ctx.beginPath();
      ctx.arc(
        Math.random() * canvas.width,
        Math.random() * canvas.height,
        Math.random() * 2 + 0.5,
        0,
        Math.PI * 2
      );
      ctx.fill();
    }

    // Draw MAXIMUM distorted text
    const charWidth = canvas.width / (code.length + 1);

    for (let i = 0; i < code.length; i++) {
      const char = code[i];
      const baseX = charWidth * (i + 1);
      const baseY = canvas.height / 2 + 5;

      // EXTREME distortion parameters
      const angle = (Math.random() - 0.5) * 1.2; // VERY large rotation
      const scaleX = 0.7 + Math.random() * 0.6; // EXTREME scale variation
      const scaleY = 0.7 + Math.random() * 0.6;
      const offsetY = (Math.random() - 0.5) * 30; // HUGE vertical movement
      const offsetX = (Math.random() - 0.5) * 15; // HUGE horizontal wobble

      // Multiple wave offsets (zigzag pattern)
      const waveOffset1 = Math.sin((i * Math.PI) / code.length) * 15;
      const waveOffset2 = Math.cos((i * Math.PI * 2) / code.length) * 12;
      
      // Random jitter on top
      const jitterX = (Math.random() - 0.5) * 8;
      const jitterY = (Math.random() - 0.5) * 8;

      ctx.save();
      
      // Apply multiple transformations
      ctx.translate(
        baseX + offsetX + jitterX,
        baseY + offsetY + waveOffset1 + waveOffset2 + jitterY
      );
      
      // Heavy rotation
      ctx.rotate(angle);
      
      // Heavy skew (transformation matrix)
      const skewAmount = (Math.random() - 0.5) * 0.6;
      const skewAmount2 = (Math.random() - 0.5) * 0.5;
      ctx.transform(1 + skewAmount2, skewAmount, skewAmount * 0.5, scaleY, 0, 0);
      
      // Scale with extremes
      ctx.scale(scaleX, scaleY);

      // SUPER BOLD BLACK text
      ctx.font = 'bold 52px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      
      // Dark fill
      ctx.fillStyle = '#000000';
      ctx.fillText(char, 0, 0);
      
      // Heavy stroke for more boldness
      ctx.strokeStyle = '#1a1a1a';
      ctx.lineWidth = 2;
      ctx.strokeText(char, 0, 0);

      ctx.restore();
    }

    // Draw darker border
    ctx.strokeStyle = '#777777';
    ctx.lineWidth = 2.5;
    ctx.strokeRect(0, 0, canvas.width, canvas.height);
  };

  // Generate CAPTCHA on component mount
  useEffect(() => {
    generateCaptcha();
  }, []);

  const validateForm = () => {
    // Validate Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return false;
    }

    // Validate Password
    if (!password || password.length < 6) {
      setError('Password must be at least 6 characters');
      return false;
    }

    // Validate CAPTCHA (only for Branch Admin)
    if (accountType === 'branch_admin') {
      if (!captchaInput) {
        setError('Please enter the verification code');
        return false;
      }
      if (captchaInput.toUpperCase() !== captchaCode) {
        setError('Invalid verification code. Please try again.');
        // Generate new CAPTCHA after failed attempt
        generateCaptcha();
        return false;
      }
    }

    return true;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const endpoint = accountType === 'super_admin' 
        ? '/api/auth/admin/login'
        : '/api/auth/branch/login';

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Invalid email or password');
        // Generate new CAPTCHA on failed login
        generateCaptcha();
        setLoading(false);
        return;
      }

      // Store session info in localStorage (for persistence across pages)
      if (data.token) {
        localStorage.setItem('adminToken', data.token);
        localStorage.setItem('userRole', accountType);
        localStorage.setItem('userData', JSON.stringify(data.user || {}));
        if (data.branch) {
          localStorage.setItem('branchData', JSON.stringify(data.branch));
        }
      }
      
      // Store role preference in localStorage
      if (rememberMe) {
        localStorage.setItem('rememberEmail', email);
      }
      localStorage.setItem('lastAccountType', accountType);

      // Redirect based on account type
      if (accountType === 'super_admin') {
        router.push('/admin/dashboard');
      } else {
        router.push('/partner/dashboard');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error('Login error:', err);
      generateCaptcha();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #0052CC 0%, #003D99 100%)' }}>
      {/* Main Container */}
      <div style={{ width: '100%', maxWidth: '420px', padding: '16px' }}>
        
        {/* Card */}
        <div style={{
          background: 'white',
          borderRadius: '16px',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
          padding: '48px 32px'
        }}>
          
          {/* Header */}
          <div style={{ marginBottom: '32px', textAlign: 'center' }}>
            <div style={{
              fontSize: '28px',
              fontWeight: '700',
              color: '#111827',
              marginBottom: '8px'
            }}>
              Sign In
            </div>
            <p style={{
              fontSize: '14px',
              color: '#6b7280',
              margin: 0
            }}>
              Sign in to manage your account
            </p>
          </div>

          {/* Account Type Selector */}
          <div style={{ marginBottom: '24px' }}>
            <label style={{
              display: 'block',
              fontSize: '13px',
              fontWeight: '600',
              color: '#111827',
              marginBottom: '10px'
            }}>
              Account Type
            </label>
            <div style={{ display: 'flex', gap: '12px' }}>
              {/* Super Admin Option */}
              <label style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 16px',
                border: accountType === 'super_admin' ? '2px solid #0052CC' : '2px solid #e5e7eb',
                borderRadius: '8px',
                cursor: 'pointer',
                background: accountType === 'super_admin' ? '#f0f6ff' : 'white',
                transition: 'all 0.2s'
              }}>
                <input
                  type="radio"
                  name="accountType"
                  value="super_admin"
                  checked={accountType === 'super_admin'}
                  onChange={(e) => setAccountType(e.target.value as 'super_admin' | 'branch_admin')}
                  style={{
                    width: '16px',
                    height: '16px',
                    cursor: 'pointer',
                    accentColor: '#0052CC'
                  }}
                />
                <span style={{
                  fontSize: '13px',
                  fontWeight: '500',
                  color: accountType === 'super_admin' ? '#0052CC' : '#6b7280'
                }}>
                  Super Admin
                </span>
              </label>

              {/* Branch Admin Option */}
              <label style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 16px',
                border: accountType === 'branch_admin' ? '2px solid #0052CC' : '2px solid #e5e7eb',
                borderRadius: '8px',
                cursor: 'pointer',
                background: accountType === 'branch_admin' ? '#f0f6ff' : 'white',
                transition: 'all 0.2s'
              }}>
                <input
                  type="radio"
                  name="accountType"
                  value="branch_admin"
                  checked={accountType === 'branch_admin'}
                  onChange={(e) => setAccountType(e.target.value as 'super_admin' | 'branch_admin')}
                  style={{
                    width: '16px',
                    height: '16px',
                    cursor: 'pointer',
                    accentColor: '#0052CC'
                  }}
                />
                <span style={{
                  fontSize: '13px',
                  fontWeight: '500',
                  color: accountType === 'branch_admin' ? '#0052CC' : '#6b7280'
                }}>
                  Branch Admin
                </span>
              </label>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div style={{
              padding: '12px 16px',
              background: '#fee2e2',
              border: '1px solid #fecaca',
              borderRadius: '8px',
              color: '#991b1b',
              fontSize: '14px',
              marginBottom: '24px'
            }}>
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            {/* Email Field */}
            <div>
              <label style={{
                display: 'block',
                fontSize: '13px',
                fontWeight: '600',
                color: '#111827',
                marginBottom: '8px'
              }}>
                Email Address
              </label>
              <div style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center'
              }}>
                <Mail size={18} style={{
                  position: 'absolute',
                  left: '12px',
                  color: '#9ca3af',
                  pointerEvents: 'none'
                }} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@skm.com"
                  style={{
                    width: '100%',
                    padding: '12px 12px 12px 40px',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontFamily: 'inherit',
                    transition: 'all 0.2s',
                    boxSizing: 'border-box'
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = '#0052CC';
                    e.currentTarget.style.boxShadow = '0 0 0 3px rgba(0, 82, 204, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = '#e5e7eb';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <label style={{
                  fontSize: '13px',
                  fontWeight: '600',
                  color: '#111827'
                }}>
                  Password
                </label>
              </div>
              <div style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center'
              }}>
                <Lock size={18} style={{
                  position: 'absolute',
                  left: '12px',
                  color: '#9ca3af',
                  pointerEvents: 'none'
                }} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  style={{
                    width: '100%',
                    padding: '12px 40px 12px 40px',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontFamily: 'inherit',
                    transition: 'all 0.2s',
                    boxSizing: 'border-box'
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = '#0052CC';
                    e.currentTarget.style.boxShadow = '0 0 0 3px rgba(0, 82, 204, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = '#e5e7eb';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: '12px',
                    background: 'none',
                    border: 'none',
                    color: '#9ca3af',
                    cursor: 'pointer',
                    padding: '4px'
                  }}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <input
                type="checkbox"
                id="remember"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                style={{
                  width: '16px',
                  height: '16px',
                  cursor: 'pointer'
                }}
              />
              <label htmlFor="remember" style={{
                fontSize: '13px',
                color: '#6b7280',
                cursor: 'pointer'
              }}>
                Remember me
              </label>
            </div>

            {/* CAPTCHA Field - Only for Branch Admin */}
            {accountType === 'branch_admin' && (
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '13px',
                  fontWeight: '600',
                  color: '#111827',
                  marginBottom: '8px'
                }}>
                  Verification Code
                </label>
                
                {/* CAPTCHA Display */}
                <div style={{
                  display: 'flex',
                  gap: '12px',
                  marginBottom: '12px',
                  alignItems: 'center'
                }}>
                  <canvas
                    id="captchaCanvas"
                    width={220}
                    height={80}
                    style={{
                      background: '#f3f4f6',
                      border: '2px solid #e5e7eb',
                      borderRadius: '8px',
                      userSelect: 'none',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                      cursor: 'default'
                    }}
                  />
                  
                  {/* Refresh Button */}
                  <button
                    type="button"
                    onClick={() => generateCaptcha()}
                    style={{
                      padding: '12px',
                      background: '#f3f4f6',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#6b7280',
                      transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#e5e7eb';
                      e.currentTarget.style.color = '#0052CC';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = '#f3f4f6';
                      e.currentTarget.style.color = '#6b7280';
                    }}
                    title="Generate new code"
                  >
                    <RotateCw size={18} />
                  </button>
                </div>

                {/* CAPTCHA Input */}
                <input
                  type="text"
                  value={captchaInput}
                  onChange={(e) => setCaptchaInput(e.target.value.toUpperCase())}
                  placeholder="Enter verification code"
                  maxLength={5}
                  style={{
                    width: '100%',
                    padding: '12px 12px',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontFamily: 'monospace',
                    fontWeight: '600',
                    letterSpacing: '2px',
                    textAlign: 'center',
                    transition: 'all 0.2s',
                    boxSizing: 'border-box'
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = '#0052CC';
                    e.currentTarget.style.boxShadow = '0 0 0 3px rgba(0, 82, 204, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = '#e5e7eb';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                />
              </div>
            )}

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              style={{
                padding: '12px 16px',
                background: loading ? '#9ca3af' : '#0052CC',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s',
                marginTop: '8px'
              }}
              onMouseEnter={(e) => {
                if (!loading) {
                  e.currentTarget.style.background = '#003D99';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                  e.currentTarget.style.boxShadow = '0 10px 20px rgba(0, 82, 204, 0.2)';
                }
              }}
              onMouseLeave={(e) => {
                if (!loading) {
                  e.currentTarget.style.background = '#0052CC';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }
              }}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>

            {/* Forgot Password */}
            <div style={{ textAlign: 'center' }}>
              <a href="#" style={{
                fontSize: '13px',
                color: '#0052CC',
                textDecoration: 'none',
                fontWeight: '500'
              }}
                onMouseEnter={(e) => e.currentTarget.style.textDecoration = 'underline'}
                onMouseLeave={(e) => e.currentTarget.style.textDecoration = 'none'}
              >
                Forgot your password?
              </a>
            </div>
          </form>

          {/* Demo Credentials */}
          <div style={{
            marginTop: '32px',
            paddingTop: '24px',
            borderTop: '1px solid #e5e7eb',
            background: '#f9fafb',
            padding: '16px',
            borderRadius: '8px',
            fontSize: '12px',
            color: '#6b7280'
          }}>
            <p style={{ margin: '0 0 8px 0', fontWeight: '500' }}>Demo Credentials:</p>
            <p style={{ margin: '4px 0' }}>📧 Email: <span style={{ fontWeight: '600', color: '#111827' }}>admin@skm.com</span></p>
            <p style={{ margin: '4px 0' }}>🔑 Password: <span style={{ fontWeight: '600', color: '#111827' }}>Admin@123</span></p>
          </div>
        </div>
      </div>
    </div>
  );
}
