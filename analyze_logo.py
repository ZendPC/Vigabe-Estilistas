from PIL import Image
import collections

img = Image.open('c:/Users/ljest/Desktop/Proyectillos/Peluquerías/Vigabe/public/images/logo.jpg')
img = img.convert('RGB')
img_small = img.resize((100, 100))

pixels = list(img_small.getdata())
counter = collections.Counter(pixels)
top = counter.most_common(20)

print('Colores más frecuentes (R, G, B):')
for color, count in top:
    r, g, b = color
    hex_color = f'#{r:02x}{g:02x}{b:02x}'
    print(f'  {hex_color}  rgb{color}  x{count}')
