// 방명록 항목 배열
let guestbookEntries = [];

// 방명록 항목을 렌더링하는 함수
function renderGuestbookEntries() {
    const guestbookEntriesContainer = document.getElementById('guestbookEntries');
    guestbookEntriesContainer.innerHTML = '';
    guestbookEntries.forEach(entry => {
        const entryElement = document.createElement('div');
        entryElement.classList.add('guestbook-entry');
        entryElement.innerHTML = `
            <p><strong>작성자:</strong> ${entry.author}</p>
            <p><strong>내용:</strong> ${entry.message}</p>
            <p><strong>작성시간:</strong> ${entry.timestamp}</p>
        `;
        // 삭제 버튼 추가
        const deleteButton = document.createElement('button');
        deleteButton.textContent = '삭제';
        deleteButton.addEventListener('click', () => deleteEntry(entry.id));
        entryElement.appendChild(deleteButton);

        guestbookEntriesContainer.appendChild(entryElement);
    });
}

// 폼 제출 이벤트를 처리하는 함수
document.getElementById('guestbookForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const authorInput = document.getElementById('authorInput').value;
    const messageInput = document.getElementById('messageInput').value;
    const timestamp = new Date().toLocaleString();
    const newEntry = {
        id: Date.now(),
        author: authorInput,
        message: messageInput,
        timestamp: timestamp
    };
    guestbookEntries.push(newEntry);
    renderGuestbookEntries();
    // 제출 후 폼 입력란 초기화
    document.getElementById('authorInput').value = '';
    document.getElementById('messageInput').value = '';
});

// 방명록 항목 삭제 함수
function deleteEntry(id) {
    guestbookEntries = guestbookEntries.filter(entry => entry.id !== id);
    renderGuestbookEntries();
}

// 페이지 로드 시 방명록 항목 렌더링
document.addEventListener('DOMContentLoaded', function () {
    renderGuestbookEntries();

    // 프로그레스 바
    const progressBar = document.querySelector('.bar-ing');
    const header = document.querySelector('#header');
    const sections = document.querySelectorAll('section');

    function updateProgressBar() {
        const windowHeight = window.innerHeight;
        const docHeight = document.body.clientHeight;
        const scrollTop = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
        const scrollPercent = (scrollTop / (docHeight - windowHeight)) * 100;

        progressBar.style.width = scrollPercent + '%';
    }

    window.addEventListener('scroll', updateProgressBar);

    // 타임라인
    let observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("in-view");
            } else {
                entry.target.classList.remove("in-view");
            }
        });
    }, { threshold: 0.3 });

    document.querySelectorAll('.timeline-item').forEach(item => {
        observer.observe(item);
    });
});
