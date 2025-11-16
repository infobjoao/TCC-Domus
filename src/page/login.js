document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.querySelector('form');

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // Simple validation (in a real app, this would be server-side)
        if (email && password) {
            // Store user in localStorage (in a real app, this would be handled by backend)
            localStorage.setItem('usuario', email);

            // Check role and redirect accordingly
            const role = localStorage.getItem('role');
            if (role === 'morador') {
                window.location.href = 'home_morador.html';
            } else {
                window.location.href = 'home.html';
            }
        } else {
            alert('Por favor, preencha todos os campos.');
        }
    });
});
