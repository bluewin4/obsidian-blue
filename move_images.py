#!/usr/bin/env python3

import os
import re
import shutil
import glob
from pathlib import Path

# Define directories
content_dir = '/Users/jack/obsidian-blue/source/content'
images_dir = '/Users/jack/obsidian-blue/source/content/images'

# Make sure the target directory exists
os.makedirs(images_dir, exist_ok=True)

# Regular expression to match "Pasted image YYYYMMDDHHMMSS.png" in markdown files
# Looks for patterns like ![[Pasted image 20250331213251.png]]
image_pattern = re.compile(r'!\[\[(Pasted image \d{14}\.png)\]\]')

# Track statistics
files_processed = 0
images_moved = 0
already_in_images = 0

# Find all markdown files in content directory and subdirectories
markdown_files = glob.glob(f"{content_dir}/**/*.md", recursive=True)

for md_file in markdown_files:
    files_processed += 1
    print(f"Processing: {md_file}")
    
    with open(md_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Find all image references in the markdown file
    matches = image_pattern.findall(content)
    
    if matches:
        for image_name in matches:
            # Check if image exists in content directory
            source_path = os.path.join(content_dir, image_name)
            target_path = os.path.join(images_dir, image_name)
            
            # If the image exists directly in content directory and not already in images
            if os.path.exists(source_path) and not os.path.exists(target_path):
                print(f"  Moving: {image_name} to images directory")
                shutil.move(source_path, target_path)
                images_moved += 1
            elif os.path.exists(target_path):
                # Image already in images folder
                already_in_images += 1

# Print summary
print("\nSummary:")
print(f"Files processed: {files_processed}")
print(f"Images moved: {images_moved}")
print(f"Images already in images folder: {already_in_images}") 