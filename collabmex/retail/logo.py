from PIL import Image, ImageOps, ImageFilter

# Cambia esta ruta a donde guardaste tu logo
logo_path = "logo.jpg"
logo = Image.open(logo_path).convert("RGBA")

# Escala de grises
gray_logo = logo.convert("L")

# Detectar contornos
edges = gray_logo.filter(ImageFilter.FIND_EDGES)

# Aplicar color de contorno (azul para carrito y "+")
contour = ImageOps.colorize(edges, black="white", white="black")
contour.putalpha(255)  # Transparencia

# Guardar resultado
output_path = "merka_contorno.png"
contour.save(output_path)

print(f"Logo de contorno guardado en: {output_path}")
