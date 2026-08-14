# Service Card Images

Upload service images for the three main services: Home Cleaning, Laundry, and Car Wash.

## File Structure
- `home-cleaning.jpg` - Home Cleaning service image
- `laundry.jpg` - Laundry service image
- `car-wash.jpg` - Car Wash service image

## Image Requirements
- Format: JPG or PNG
- Size: 500x400px (or higher, will be cropped to fit)
- Style: Professional service-related images
- Optimization: Compress images for web (max 500KB each)
- Should show the service in action or the final result

## How It Works
- Images will be loaded from `/public/service-images/[service].jpg`
- Each image displays on the service card in the homepage Services section
- If an image is not found, a placeholder will show

## Example Upload
1. Create professional JPG images (500x400px)
2. Rename them to:
   - `home-cleaning.jpg`
   - `laundry.jpg`
   - `car-wash.jpg`
3. Place in this folder
4. Restart the dev server: `npm run dev`

## Image Suggestions

### Home Cleaning
- Professional cleaner with cleaning supplies
- Spotless clean room/kitchen
- Cleaning in progress shot
- Happy customer in clean home

### Laundry
- Fresh, clean folded clothes
- Laundry washing/drying in progress
- Professional laundry facility
- Neatly organized clean garments

### Car Wash
- Shiny, freshly washed car
- Professional car washing in action
- Before and after comparison
- Car detailing close-up
