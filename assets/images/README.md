# Grow Godz image library

Image files are grouped by subject and delivery format:

- `originals/` preserves the highest-quality source files.
- `webp/` mirrors the same category and filename structure for production use.
- `brand/` contains logos and brand environments.
- `cultivation/` contains flower, harvest, canopy, and grow-room photography.
- `lifestyle/` contains editorial workspace, apparel, and accessory scenes.
- `products/` contains bottles, apparel, accessories, posters, and product cutouts.

All filenames are lowercase, hyphenated, descriptive, and suitable for search indexing.
Run `scripts/generate_webp.py` with Pillow available to regenerate every WebP derivative without modifying the originals.
