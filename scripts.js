fetch('https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@wrenyeeshy')
   .then((res) => res.json())
   .then((data) => {
      const res = data.items;
      const posts = res.filter(item => item.categories.length > 0);

      const limitedPosts = posts.slice(0, 2);

      function toText(node) {
         let tag = document.createElement('div');
         tag.innerHTML = node;
         node = tag.innerText;
         return node;
      }

      function shortenText(text, startingPoint, maxLength) {
         return text.length > maxLength ?
            text.slice(startingPoint, maxLength) + '...' :
            text;
      }

      let output = '';
      limitedPosts.forEach((item) => {
         output += `
         <li class="blog__post">
            <a href="${item.link}" target="_blank">
               <div class="blog__content">
                  <div class="blog_preview">
                     <h2 class="blog__title">${shortenText(item.title, 0, 30)}</h2>
                     <p class="blog__intro">${shortenText(toText(item.content), 60, 300)}</p>
                  </div>
                  <hr>
                  <div class="blog__info">
                     <span class="blog__author">${item.author}</span>
                     <span class="blog__date">${shortenText(item.pubDate, 0, 10)}</span>
                  </div>
               </div>
            </a>
         </li>`;
      });

      document.querySelector('.blog__slider').innerHTML = output;
   })
   .catch((error) => console.error('Error fetching the Medium feed:', error));
