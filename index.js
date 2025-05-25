function updateClock() {
    const now = new Date()
    const hours = 
String(now.getHours()).padStart(2,'0')
    const minutes = 
String(now.getMinutes()).padStart(2,'0')
    const seconds = 
String(now.getSeconds()).padStart(2,'0')
    const timeString = `${hours}:${minutes}:${seconds}`
document.getElementById('clock').textContent = timeString
}
setInterval(updateClock, 1000)
updateClock()

document.addEventListener("DOMContentLoaded", () =>{
    const taskForm = document.getElementById("task-form");
    const taskInput = document.getElementById("task-input");
    const taskList = document.getElementById("task-list");
    taskForm.addEventListener('submit', (e) => {
            e.preventDefault();
            addTask(taskInput.value);
            taskInput.value = '';
        });
    function addTask(task) {
        const li = document.createElement("li");
        li.textContent = task;
        const deleteButton = document.createElement("button");
        deleteButton.textContent = 'delete';
        deleteButton.addEventListener("click", () => {
            taskList.removeChild(li);
        });
        li.appendChild(deleteButton)
        taskList.appendChild(li);
    }
  });
  function calculate() {
    const work = +document.getElementById('work').value || 0;
    const study = +document.getElementById('study').value || 0;
    const rest = +document.getElementById('rest').value || 0;
    const fun = +document.getElementById('fun').value || 0;
    const other = +document.getElementById('other').value || 0;

    const total = work + study + rest + fun + other;
    const productive = work + study;
    const unproductive = fun + rest;

    if (total === 0) {
      document.getElementById('result').innerHTML = 'Введите хотя бы одно значение.';
      return;
    }

    const productivePercent = ((productive / total) * 100).toFixed(1);
    const unproductivePercent = ((unproductive / total) * 100).toFixed(1);

    document.getElementById('result').innerHTML = `
      Продуктивное время: <strong>${productivePercent}%</strong><br>
      Непродуктивное время: <strong>${unproductivePercent}%</strong>
    `;

    renderChart(productivePercent, unproductivePercent);
  }

  let chart;

  function renderChart(productive, unproductive) {
    const ctx = document.getElementById('productivityChart').getContext('2d');

    if (chart) chart.destroy();

    chart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['Продуктивное', 'Непродуктивное'],
        datasets: [{
          data: [productive, unproductive],
          backgroundColor: ['#4CAF50', '#f44336'],
        }]
      },
      options: {
        responsive: true
      }
    });
  }

  let workDuration = 25 * 60; // 25 минут
    let breakDuration = 5 * 60; // 5 минут
    let timeLeft = workDuration;
    let timer;
    let isRunning = false;
    let onBreak = false;

    function updateDisplay() {
      const minutes = Math.floor(timeLeft / 60);
      const seconds = timeLeft % 60;
      document.getElementById('timer').textContent =
        `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

      const total = onBreak ? breakDuration : workDuration;
      const percent = 100 - (timeLeft / total) * 100;
      document.getElementById('progressBar').style.width = `${percent}%`;
    }

    function startTimer() {
      if (isRunning) return;
      isRunning = true;
      timer = setInterval(() => {
        if (timeLeft > 0) {
          timeLeft--;
          updateDisplay();
        } else {
          clearInterval(timer);
          isRunning = false;
          onBreak = !onBreak;
          timeLeft = onBreak ? breakDuration : workDuration;
          document.getElementById('status').textContent = onBreak ? 'Режим: Перерыв' : 'Режим: Работа';
          alert(onBreak ? 'Время отдыха!' : 'Пора вернуться к работе!');
          updateDisplay();
          startTimer(); // автоматический переход к следующему этапу
        }
      }, 1000);
    }

    function pauseTimer() {
      clearInterval(timer);
      isRunning = false;
    }

    function resetTimer() {
      clearInterval(timer);
      isRunning = false;
      onBreak = false;
      timeLeft = workDuration;
      document.getElementById('status').textContent = 'Режим: Работа';
      updateDisplay();
    }

    updateDisplay();

    document.getElementById("contactForm")
    addEventListener("submit",function(event) {
        event.preventDefault()

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const message = document.getElementById("message").value.trim();

        if (!name || !email || !message)
        {
          alert("Пожулуйста, заполните все поля")
          return
        }

        const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
        if (!emailPattern.test(email)) {
          alert("Пожалуйстаб введите корректный email")
          return
        }
        
        alert("форма успешно отправлена")
      }
    )