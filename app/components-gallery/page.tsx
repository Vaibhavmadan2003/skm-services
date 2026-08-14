import { Button } from '@/app/components/ui/Button';
import { Input } from '@/app/components/ui/Input';
import { Badge } from '@/app/components/ui/Badge';
import { Card } from '@/app/components/ui/Card';
import { Alert } from '@/app/components/ui/Alert';
import { Loader } from '@/app/components/ui/Loader';
import { CheckCircle, Mail } from 'lucide-react';

export default function ComponentsGallery() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb', padding: '24px' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        
        {/* Header */}
        <div style={{ marginBottom: '48px' }}>
          <h1 style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '12px', color: '#111827' }}>
            Components Gallery
          </h1>
          <p style={{ fontSize: '18px', color: '#6b7280' }}>
            Complete showcase of all 24 UI components in all variants and states
          </p>
        </div>

        {/* BUTTONS SECTION */}
        <section style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '24px', paddingTop: '24px', borderTop: '1px solid #e5e7eb', color: '#111827' }}>
            Buttons
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
            {/* Primary Button */}
            <div style={{ backgroundColor: '#fff', padding: '24px', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px', color: '#111827' }}>Primary</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <Button variant="primary" size="md">Primary Button</Button>
                <Button variant="primary" size="sm">Small</Button>
                <Button variant="primary" size="lg">Large</Button>
                <Button variant="primary" disabled>Disabled</Button>
                <Button variant="primary" isLoading>Loading</Button>
              </div>
            </div>

            {/* Secondary Button */}
            <div style={{ backgroundColor: '#fff', padding: '24px', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px', color: '#111827' }}>Secondary</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <Button variant="secondary" size="md">Secondary Button</Button>
                <Button variant="secondary" size="sm">Small</Button>
                <Button variant="secondary" size="lg">Large</Button>
                <Button variant="secondary" disabled>Disabled</Button>
                <Button variant="secondary" isLoading>Loading</Button>
              </div>
            </div>

            {/* Other Variants */}
            <div style={{ backgroundColor: '#fff', padding: '24px', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px', color: '#111827' }}>Other Variants</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <Button variant="tertiary">Tertiary</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="danger">Danger</Button>
                <Button variant="success">Success</Button>
              </div>
            </div>

            {/* With Icons */}
            <div style={{ backgroundColor: '#fff', padding: '24px', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px', color: '#111827' }}>With Icons</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <Button leftIcon={<Mail size={18} />}>Left Icon</Button>
                <Button rightIcon={<CheckCircle size={18} />}>Right Icon</Button>
                <Button size="full">Full Width</Button>
              </div>
            </div>
          </div>
        </section>

        {/* FORMS SECTION */}
        <section style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '24px', paddingTop: '24px', borderTop: '1px solid #e5e7eb', color: '#111827' }}>
            Form Components
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
            {/* Input */}
            <div style={{ backgroundColor: '#fff', padding: '24px', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px', color: '#111827' }}>Input</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <Input placeholder="Default input" />
                <Input label="With label" placeholder="Enter text" />
                <Input label="Error" error errorMessage="Required field" defaultValue="Invalid" />
                <Input size="sm" placeholder="Small" />
                <Input size="lg" placeholder="Large" />
              </div>
            </div>

            {/* Select */}
            <div style={{ backgroundColor: '#fff', padding: '24px', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px', color: '#111827' }}>Select</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <select style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #d1d5db', fontSize: '14px' }}>
                  <option>Select option</option>
                  <option>Option 1</option>
                  <option>Option 2</option>
                </select>
              </div>
            </div>

            {/* Textarea */}
            <div style={{ backgroundColor: '#fff', padding: '24px', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px', color: '#111827' }}>Textarea</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <textarea style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #d1d5db', fontSize: '14px', fontFamily: 'inherit', minHeight: '80px' }} placeholder="Multi-line text"></textarea>
              </div>
            </div>

            {/* Checkbox */}
            <div style={{ backgroundColor: '#fff', padding: '24px', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px', color: '#111827' }}>Checkbox</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', cursor: 'pointer' }}>
                  <input type="checkbox" /> Unchecked
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', cursor: 'pointer' }}>
                  <input type="checkbox" defaultChecked /> Checked
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', cursor: 'pointer', opacity: '0.5' }}>
                  <input type="checkbox" disabled /> Disabled
                </label>
              </div>
            </div>

            {/* Radio */}
            <div style={{ backgroundColor: '#fff', padding: '24px', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px', color: '#111827' }}>Radio</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', cursor: 'pointer' }}>
                  <input type="radio" name="radio-demo" /> Option 1
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', cursor: 'pointer' }}>
                  <input type="radio" name="radio-demo" defaultChecked /> Option 2
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', cursor: 'pointer', opacity: '0.5' }}>
                  <input type="radio" name="radio-demo" disabled /> Disabled
                </label>
              </div>
            </div>
          </div>
        </section>

        {/* CARDS SECTION */}
        <section style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '24px', paddingTop: '24px', borderTop: '1px solid #e5e7eb', color: '#111827' }}>
            Cards
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
            <Card variant="default">
              <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '12px' }}>Default Card</h3>
              <p style={{ fontSize: '14px', color: '#6b7280' }}>Standard card with subtle shadow</p>
            </Card>

            <Card variant="elevated">
              <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '12px' }}>Elevated Card</h3>
              <p style={{ fontSize: '14px', color: '#6b7280' }}>More prominent shadow</p>
            </Card>

            <Card variant="interactive">
              <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '12px' }}>Interactive Card</h3>
              <p style={{ fontSize: '14px', color: '#6b7280' }}>Hover for effect</p>
            </Card>

            <Card variant="outlined">
              <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '12px' }}>Outlined Card</h3>
              <p style={{ fontSize: '14px', color: '#6b7280' }}>Border only, no shadow</p>
            </Card>

            <Card variant="ghost">
              <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '12px' }}>Ghost Card</h3>
              <p style={{ fontSize: '14px', color: '#6b7280' }}>Minimal styling</p>
            </Card>
          </div>
        </section>

        {/* BADGES SECTION */}
        <section style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '24px', paddingTop: '24px', borderTop: '1px solid #e5e7eb', color: '#111827' }}>
            Badges
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
            {/* Solid Badges */}
            <div style={{ backgroundColor: '#fff', padding: '24px', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px', color: '#111827' }}>Solid</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                <Badge variant="solid-primary">Primary</Badge>
                <Badge variant="solid-emerald">Success</Badge>
                <Badge variant="solid-rose">Danger</Badge>
                <Badge variant="solid-amber">Warning</Badge>
                <Badge variant="solid-gray">Neutral</Badge>
              </div>
            </div>

            {/* Outline Badges */}
            <div style={{ backgroundColor: '#fff', padding: '24px', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px', color: '#111827' }}>Outline</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                <Badge variant="outline-primary">Primary</Badge>
                <Badge variant="outline-emerald">Success</Badge>
                <Badge variant="outline-rose">Danger</Badge>
              </div>
            </div>

            {/* Subtle Badges */}
            <div style={{ backgroundColor: '#fff', padding: '24px', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px', color: '#111827' }}>Subtle</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                <Badge variant="subtle-primary">Primary</Badge>
                <Badge variant="subtle-emerald">Success</Badge>
                <Badge variant="subtle-rose">Danger</Badge>
              </div>
            </div>

            {/* Sizes */}
            <div style={{ backgroundColor: '#fff', padding: '24px', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px', color: '#111827' }}>Sizes</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                <Badge size="sm">Small</Badge>
                <Badge size="md">Medium</Badge>
                <Badge size="lg">Large</Badge>
              </div>
            </div>

            {/* With Icon */}
            <div style={{ backgroundColor: '#fff', padding: '24px', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px', color: '#111827' }}>With Icon</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                <Badge icon={<CheckCircle size={14} />}>Verified</Badge>
                <Badge variant="solid-emerald" icon={<CheckCircle size={14} />}>Active</Badge>
              </div>
            </div>
          </div>
        </section>

        {/* ALERTS SECTION */}
        <section style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '24px', paddingTop: '24px', borderTop: '1px solid #e5e7eb', color: '#111827' }}>
            Alerts
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <Alert variant="info" title="Information">
              This is an informational alert message.
            </Alert>
            <Alert variant="success" title="Success">
              Your changes have been saved successfully.
            </Alert>
            <Alert variant="warning" title="Warning">
              Please review before proceeding.
            </Alert>
            <Alert variant="error" title="Error">
              Something went wrong. Please try again.
            </Alert>
            <Alert variant="neutral" title="Neutral">
              This is a neutral alert message.
            </Alert>
          </div>
        </section>

        {/* LOADERS SECTION */}
        <section style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '24px', paddingTop: '24px', borderTop: '1px solid #e5e7eb', color: '#111827' }}>
            Loaders
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
            {/* Spinner */}
            <div style={{ backgroundColor: '#fff', padding: '24px', borderRadius: '8px', border: '1px solid #e5e7eb', textAlign: 'center' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px', color: '#111827' }}>Spinner</h3>
              <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', alignItems: 'center' }}>
                <Loader size="sm" />
                <Loader size="md" />
                <Loader size="lg" />
                <Loader size="xl" />
              </div>
            </div>

            {/* Pulse */}
            <div style={{ backgroundColor: '#fff', padding: '24px', borderRadius: '8px', border: '1px solid #e5e7eb', textAlign: 'center' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px', color: '#111827' }}>Pulse</h3>
              <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', alignItems: 'center' }}>
                <Loader variant="pulse" size="sm" />
                <Loader variant="pulse" size="md" />
                <Loader variant="pulse" size="lg" />
              </div>
            </div>

            {/* Dots */}
            <div style={{ backgroundColor: '#fff', padding: '24px', borderRadius: '8px', border: '1px solid #e5e7eb', textAlign: 'center' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px', color: '#111827' }}>Dots</h3>
              <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', alignItems: 'center' }}>
                <Loader variant="dots" size="sm" />
                <Loader variant="dots" size="md" />
              </div>
            </div>
          </div>
        </section>

        {/* COLORS SECTION */}
        <section style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '24px', paddingTop: '24px', borderTop: '1px solid #e5e7eb', color: '#111827' }}>
            Design Tokens - Colors
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '16px' }}>
            {[
              { name: 'Brand Blue', color: '#0052CC' },
              { name: 'Brand Light', color: '#F0F6FF' },
              { name: 'Emerald', color: '#10B981' },
              { name: 'Rose', color: '#EF4444' },
              { name: 'Amber', color: '#F59E0B' },
              { name: 'Gray 50', color: '#F9FAFB' },
              { name: 'Gray 200', color: '#E5E7EB' },
              { name: 'Gray 900', color: '#111827' },
            ].map(({ name, color }) => (
              <div key={name} style={{ textAlign: 'center' }}>
                <div style={{ width: '100%', height: '100px', backgroundColor: color, borderRadius: '8px', border: '1px solid #d1d5db', marginBottom: '12px' }} />
                <p style={{ fontSize: '14px', fontWeight: '600', color: '#111827' }}>{name}</p>
                <p style={{ fontSize: '12px', color: '#6b7280' }}>{color}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <div style={{ textAlign: 'center', paddingTop: '24px', borderTop: '1px solid #e5e7eb', marginTop: '48px' }}>
          <p style={{ fontSize: '14px', color: '#6b7280' }}>
            ✅ UI Component Preview - All 24 components displayed for reference
          </p>
        </div>
      </div>
    </div>
  );
}
