function loadItems(jsonFile, containerId, detailText, detailLink) {
    fetch(jsonFile)
        .then(res => res.json())
        .then(data => {
            const container = document.getElementById(containerId);

            // 日付順にソート（最新順）
            data.sort((a, b) => new Date(b.date) - new Date(a.date));

            data.forEach(item => {
                const link = document.createElement('a');
                link.className = 'main-content-link';
                link.href = item.url;

                const img = document.createElement('img');
                img.className = 'main-content-link-img';
                img.src = item.img;
                img.alt = item.title;

                const textDiv = document.createElement('div');
                textDiv.className = 'main-content-link-text';

                const h3 = document.createElement('h3');
                h3.className = 'main-content-link-title';
                h3.textContent = item.title;

                const p = document.createElement('p');
                p.className = 'main-content-link-date';
                p.textContent = item.date;

                textDiv.appendChild(h3);
                textDiv.appendChild(p);
                link.appendChild(img);
                link.appendChild(textDiv);

                const hr = document.createElement('hr');
                hr.className = 'main-content-hr';

                container.appendChild(link);
                container.appendChild(hr);
            });
        })
        .catch(err => console.error('JSON読み込みエラー:', err));
}

loadItems('/articles/articles.json', 'article-list');

loadItems('/articles/news.json', 'news-list');
