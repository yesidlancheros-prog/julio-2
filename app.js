const addForm = document.getElementById('addForm');
const classesContainer = document.getElementById('classes');
const editModal = document.getElementById('editModal');
const editForm = document.getElementById('editForm');
const cancelEdit = document.getElementById('cancelEdit');

let editingIndex = null;
let classes = JSON.parse(localStorage.getItem('gymClasses')) || [];

function saveClasses() {
  localStorage.setItem('gymClasses', JSON.stringify(classes));
  renderClasses();
}

function renderClasses() {
  classesContainer.innerHTML = '';
  classes.forEach((c, i) => {
    const div = document.createElement('div');
    div.className = 'class-card';
    div.innerHTML = `<h4>${c.name}</h4><p>${c.day} - ${c.hour}</p><p>${c.type}</p>`;
    div.onclick = () => openEdit(i);
    classesContainer.appendChild(div);
  });
}

addForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const day = document.getElementById('day').value;
  const hour = document.getElementById('hour').value;
  const type = document.getElementById('type').value;
  classes.push({ name, day, hour, type });
  saveClasses();
  addForm.reset();
});

function openEdit(i) {
  editingIndex = i;
  const c = classes[i];
  document.getElementById('editName').value = c.name;
  document.getElementById('editDay').value = c.day;
  document.getElementById('editHour').value = c.hour;
  document.getElementById('editType').value = c.type;
  editModal.classList.remove('hidden');
}

editForm.addEventListener('submit', (e) => {
  e.preventDefault();
  classes[editingIndex] = {
    name: document.getElementById('editName').value,
    day: document.getElementById('editDay').value,
    hour: document.getElementById('editHour').value,
    type: document.getElementById('editType').value
  };
  saveClasses();
  editModal.classList.add('hidden');
});

cancelEdit.addEventListener('click', () => editModal.classList.add('hidden'));

renderClasses();
