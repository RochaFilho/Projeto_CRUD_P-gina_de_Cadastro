document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('dataForm');
    const dataTable = document.getElementById('dataTable');

    // Função para salvar dados no localStorage
    const saveData = (data) => {
        let storedData = JSON.parse(localStorage.getItem('userData')) || [];
        storedData.push(data);
        localStorage.setItem('userData', JSON.stringify(storedData));
    };

    // Função para carregar dados do localStorage e exibir na tabela
    const loadData = () => {
        let storedData = JSON.parse(localStorage.getItem('userData')) || [];
        const tbody = dataTable.querySelector('tbody');
        tbody.innerHTML = '';

        storedData.forEach((data, index) => {
            let row = tbody.insertRow();
            row.insertCell(0).textContent = data.name;
            row.insertCell(1).textContent = data.phone;
            row.insertCell(2).textContent = data.email;
            let actionsCell = row.insertCell(3);
            let deleteButton = document.createElement('button');
            deleteButton.textContent = 'Excluir';
            deleteButton.classList.add('delete-button');
            deleteButton.addEventListener('click', () => deleteData(index));
            actionsCell.appendChild(deleteButton);
        });
    };

    // Função para excluir dados do localStorage
    const deleteData = (index) => {
        let storedData = JSON.parse(localStorage.getItem('userData')) || [];
        storedData.splice(index, 1);
        localStorage.setItem('userData', JSON.stringify(storedData));
        loadData(); // Recarregar a tabela após exclusão
    };

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;
            const email = document.getElementById('email').value;

            saveData({ name, phone, email });

            // Limpar o formulário
            form.reset();
            alert('Dados cadastrados com sucesso!');
        });
    }

    if (dataTable) {
        loadData();
    }
});