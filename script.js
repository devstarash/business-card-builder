const fields = document.getElementById('editor').elements;
const phoneButton = document.querySelector('.phone-button');
const extraPhoneField = document.getElementById('extraPhoneField');


for (const radio of document.querySelectorAll('.alignment input')) {
  const icon = document.createElement('span');
  icon.innerHTML = '<i></i><i></i><i></i><i></i>';
  icon.title = radio.getAttribute('aria-label');
  radio.after(icon);
}

for (const radio of document.querySelectorAll('.colors input')) {
  const circle = document.createElement('span');
  circle.style.backgroundColor = radio.value;
  circle.title = radio.getAttribute('aria-label');
  radio.after(circle);
}


phoneButton.onclick = function () {
  if (extraPhoneField.hidden) {
    extraPhoneField.hidden = false;
    phoneButton.setAttribute('aria-expanded', 'true');
    phoneButton.textContent = 'Убрать дополнительный телефон';
    fields.extraPhone.focus();
  } else {
    extraPhoneField.hidden = true;
    phoneButton.setAttribute('aria-expanded', 'false');
    phoneButton.textContent = 'Добавить еще один телефон';
    fields.extraPhone.value = '';
  }
};

function apply() {
  document.querySelector('.card-company').textContent = fields.organization.value.trim();

  const nameLine = document.querySelector('.card-name');
  nameLine.textContent = fields.fullName.value.trim();
  nameLine.style.textAlign = fields.nameAlign.value;
  nameLine.style.fontSize = fields.nameSize.value + 'px';
  nameLine.style.color = fields.nameColor.value;

  const jobLine = document.querySelector('.card-job');
  jobLine.textContent = fields.job.value.trim();
  jobLine.style.textAlign = fields.jobAlign.value;
  jobLine.style.fontSize = fields.jobSize.value + 'px';
  jobLine.style.color = fields.jobColor.value;

  const lines = [fields.phone.value];
  if (!extraPhoneField.hidden) lines.push(fields.extraPhone.value);
  if (fields.showEmail.checked) lines.push(fields.email.value);
  if (fields.showAddress.checked) lines.push(fields.address.value);

  const contacts = document.querySelector('.card-contacts');
  contacts.textContent = '';
  for (const value of lines) {
    if (value.trim() !== '') {
      const line = document.createElement('p');
      line.textContent = value.trim();
      contacts.append(line);
    }
  }
}


apply();
document.querySelector('.apply-button').onclick = apply;
