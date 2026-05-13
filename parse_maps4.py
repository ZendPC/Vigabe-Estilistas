import re, json

data = open('c:/Users/ljest/Desktop/Proyectillos/Peluquerías/maps.html', encoding='utf-8').read()

# Extraer bloque grande desde pos 109004
chunk = data[109000:115000]
chunk_decoded = re.sub(r'\\u([0-9a-fA-F]{4})', lambda m: chr(int(m.group(1), 16)), chunk)
chunk_decoded = chunk_decoded.replace('\\n', '\n').replace('\\"', '"').replace('\\\\', '\\')

# Buscar teléfono
phones = re.findall(r'(?:\+34\s?)?[6789]\d{8}', chunk_decoded)
print('Teléfonos:', phones[:10])

# Buscar dirección
addrs = re.findall(r'[A-ZÁÉÍÓÚ][a-záéíóúñ]+(?:\s+[A-Za-záéíóúñ]+){1,5},?\s*\d{5}', chunk_decoded)
print('Direcciones:', addrs[:5])

# Buscar horarios
hours = re.findall(r'(?:Lunes|Martes|Mi[eé]rcoles|Jueves|Viernes|S[aá]bado|Domingo)[^\n"]{0,60}', chunk_decoded, re.IGNORECASE)
print('Horarios:', hours[:10])

# Coordenadas ya encontradas
print('Coordenadas: 36.9164288, -2.4313856')
print('Ciudad: Almería')

# Imprimir fragmento limpio
print('\n--- FRAGMENTO ---')
print(chunk_decoded[:3000])
