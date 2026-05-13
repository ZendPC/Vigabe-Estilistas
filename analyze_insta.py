from PIL import Image
import collections

img = Image.open('c:/Users/ljest/Desktop/Proyectillos/Peluquerías/insta_profile.png')
img = img.convert('RGB')
w, h = img.size
print(f'Tamaño screenshot: {w}x{h}')

# Zona superior izquierda donde está el logo/avatar de Instagram
# Normalmente el avatar está en la parte superior izquierda
logo_zone = img.crop((0, 0, 300, 300))
logo_zone.save('c:/Users/ljest/Desktop/Proyectillos/Peluquerías/insta_logo_zone.png')

# Analizar colores con matiz en toda la imagen
pixels = list(img.getdata())
colored = []
for r, g, b in pixels:
    diff = max(abs(r-g), abs(r-b), abs(g-b))
    if diff > 20 and not (r > 200 and g > 200 and b > 200):  # no blanco
        colored.append((r, g, b))

print(f'Píxeles con color: {len(colored)}')

# Cuantizar a colores representativos
img_small = img.resize((200, 200))
img_quant = img_small.quantize(colors=16).convert('RGB')
quant_pixels = list(img_quant.getdata())
counter = collections.Counter(quant_pixels)
top = counter.most_common(16)

print('\nColores principales (cuantizados):')
for color, count in top:
    r, g, b = color
    hex_color = f'#{r:02x}{g:02x}{b:02x}'
    pct = count / len(quant_pixels) * 100
    print(f'  {hex_color}  rgb({r},{g},{b})  {pct:.1f}%')
