# IP Network Calculator (JavaScript)

A simple web tool to calculate essential network information (network address, broadcast address, minimum and maximum usable IPs) from an IPv4 address and CIDR notation. Enter an IP address and a CIDR mask to instantly see the results!

---

## ✨ Features

- **IP and CIDR validation:** Ensures user input is correct before calculation.
- **Automatic calculations:**  
  - Network address  
  - Broadcast address  
  - Minimum usable address  
  - Maximum usable address
- **Dynamic results:** Results are displayed automatically in a table.
- **Simple interface:** Easy-to-use web form.

---

## 🚀 Getting Started

1. **Clone this repository:**
   ```bash
   git clone https://github.com/YassineDeplanque/Network-calculator.git
   cd ip-network-calculator
   ```

2. **Open `index.html` in your web browser.**

3. **Enter an IP address and CIDR mask, then submit the form.**

4. **View the results in the generated table.**

---

## 🛠️ Technologies

- JavaScript (ES6)
- HTML5 & CSS3

---

## ⚙️ How it Works

- **Reseau class:**  
  Encapsulates all network calculation logic (binary conversion, masks, address calculations, etc).
- **Validation:**  
  Methods ensure valid IP and CIDR input.
- **Network calculations:**  
  Converts IP to binary, applies subnet mask, and calculates network/broadcast/min/max addresses.
- **Display:**  
  Results are dynamically added to a table in the UI.

---

## 💡 Tip

This calculator is ideal for students, teachers, and professionals needing quick subnet calculations!

---
