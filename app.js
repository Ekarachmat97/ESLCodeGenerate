document.addEventListener("DOMContentLoaded", function() {
    const tabs = document.querySelectorAll('nav a');
    tabs.forEach(tab => {
        tab.addEventListener('click', function(e) {
            e.preventDefault();
            const tabContentId = this.getAttribute('href').substring(1);
            const tabContent = document.getElementById(tabContentId);
            const allTabs = document.querySelectorAll('.tabcontent');
            allTabs.forEach(tab => {
                tab.style.display = 'none';
            });
            document.querySelectorAll('nav a').forEach(a => {
                a.classList.remove('active');
            });
            tabContent.style.display = 'block';
            this.classList.add('active');
        });
    });

    // Menampilkan tab default
    document.getElementById('home').style.display = 'block';
    document.querySelector('nav a').classList.add('active');

    // Tombol WhatsApp
    document.getElementById('whatsapp-button').addEventListener('click', function() {
        window.open('https://wa.me/6289691213179', '_blank');
    });

    // Memperbarui Shelf Life
    document.getElementById('expired-code-form').addEventListener('submit', function(e) {
        e.preventDefault();
        updateShelfLife();
    });

    // Dark Mode Toggle
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    darkModeToggle.addEventListener('change', function() {
        toggleDarkMode();
        updateToggleLabel();
    });

    // Mengecek localStorage untuk preferensi mode gelap
    const darkModeEnabled = localStorage.getItem('darkModeEnabled') === 'true';
    darkModeToggle.checked = darkModeEnabled;
    if (darkModeEnabled) {
        enableDarkMode();
    }

    // Memperbarui teks label toggle saat halaman dimuat
    updateToggleLabel();

    // Toggle Opsi
    document.getElementById('open-menu').addEventListener('click', toggleOption);

    // Close Option
    document.getElementById('close-option').addEventListener('click', function() {
        document.getElementById('option').style.display = 'none';
    });
});

function updateShelfLife() {
    const shelfLifeB2B = parseInt(document.getElementById('shelflife-b2b').value);
    const shelfLifeMT = parseInt(document.getElementById('shelflife-MT').value);
    const shelfLifeChocolate = parseInt(document.getElementById('shelflife-Chocolate').value);

    // Memanggil fungsi generateExpiredCode dengan shelfLife yang diperbarui
    const productionDate = document.getElementById('production-date').value;
    const productVariant = document.getElementById('product-variant').value;
    let expiredCodes = generateExpiredCode(productionDate, productVariant, shelfLifeB2B, shelfLifeMT, shelfLifeChocolate);

    document.getElementById('expired-code').value = expiredCodes.join('\n');
}

function generateExpiredCode(productionDate, productVariant, shelfLifeB2B, shelfLifeMT, shelfLifeChocolate) {
    let expiredCodes = [];
    const date = new Date(productionDate);
    let expiredDate1, expiredDate2;

    // Logika generate code berdasarkan varian produk dengan shelfLife yang diperbarui
    if (productVariant === 'Fullcream B2B') {
        expiredDate1 = addDays(date, shelfLifeB2B);
        expiredCodes.push(`PFS EXP ${formatDate(expiredDate1)}`);
    } else if (productVariant === 'Fullcream MT') {
        expiredDate1 = addDays(date, shelfLifeMT);
        expiredDate2 = addDays(date, shelfLifeChocolate);
        expiredCodes.push(`PFF EXP ${formatDate(expiredDate1)}  dan  `);
        expiredCodes.push(`PFF EXP ${formatDate(expiredDate2)}`);
    } else if (productVariant === 'Chocolate') {
        expiredDate1 = addDays(date, shelfLifeMT);
        expiredDate2 = addDays(date, shelfLifeChocolate);
        expiredCodes.push(`PFC EXP ${formatDate(expiredDate1)}  dan  `);
        expiredCodes.push(`PFC EXP ${formatDate(expiredDate2)}`);
    }

    return expiredCodes;
}

function addDays(date, days) {
    let result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}

function formatDate(date) {
    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const monthAbbreviation = monthNames[monthIndex];
    return `${day}/${monthAbbreviation}/${year}`;
}

function toggleDarkMode() {
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    if (darkModeToggle.checked) {
        enableDarkMode();
        localStorage.setItem('darkModeEnabled', 'true');
    } else {
        disableDarkMode();
        localStorage.setItem('darkModeEnabled', 'false');
    }
}

function enableDarkMode() {
    document.body.classList.add('dark-mode');
}

function disableDarkMode() {
    document.body.classList.remove('dark-mode');
}

function updateToggleLabel() {
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const toggleLabel = document.querySelector('.toggle-label');
    toggleLabel.textContent = darkModeToggle.checked ? "Mode Terang" : "Mode Gelap";
}

function toggleOption() {
    var optionDiv = document.getElementById("option");
        optionDiv.style.display = "block";
}

function closeOptions() {
    var optionDiv = document.getElementById("option");
    optionDiv.style.display = "none";
}