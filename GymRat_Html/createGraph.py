import matplotlib.pyplot as plt
import numpy as np

plt.style.use('dark_background')
x = np.array(["03/07/23", "05/07/23", "07/07/23", "10/07/23", "11/07/23", "12/07/23"])
y = np.array([40, 90, 45, 50, 55, 20])

fig = plt.figure(figsize=(6, 5))
ax = fig.add_subplot(111)
bars = ax.bar(x, y, color="red", width=0.2, edgecolor="black", linewidth=1)

# Añadir etiquetas con los valores de y en cada barra
for bar in bars:
    yval = bar.get_height()
    ax.text(bar.get_x() + bar.get_width() / 2, yval, yval, ha='center', va='bottom')

# Crear leyenda
#legend_labels = ['0-10 Reps', '10-20 Reps', '20-30 Reps', '30-40 Reps', '40-50 Reps']  # Etiquetas para cada color
#legend_colors = ['green', 'yellow', 'orange', 'red', 'purple']  # Colores correspondientes a las etiquetas
#legend_elements = [plt.Rectangle((0, 0), 1, 0, color=color) for color in legend_colors]

#ax.legend(legend_elements, legend_labels, bbox_to_anchor=(1, 1.01), loc='upper left')

plt.grid()
output_path = './grafic.png'
plt.savefig(output_path)
plt.show()
