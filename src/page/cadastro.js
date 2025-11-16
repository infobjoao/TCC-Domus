document.addEventListener('DOMContentLoaded', function() {
    const cadastroForm = document.querySelector('form');

    cadastroForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirm-password').value;
        const role = document.querySelector('input[name="role"]:checked');

        // Simple validation
        if (name && email && password && confirmPassword && role) {
            if (password !== confirmPassword) {
                alert('As senhas não coincidem.');
                return;
            }

            // Store user and role in localStorage (in a real app, this would be handled by backend)
            localStorage.setItem('usuario', name);
            localStorage.setItem('role', role.value);

            // Redirect to home.html
            window.location.href = 'home.html';
        } else {
            alert('Por favor, preencha todos os campos.');
        }
    });
});
