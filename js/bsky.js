class PostComment extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const shadow = this.attachShadow({ mode: "open" });
    this.innerHTML = "Hello";
  }
}

class PostComments extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const shadow = this.attachShadow({ mode: "closed" });

    const profile = this.getAttribute("profile");
    if (profile === null) {
      console.error("no profile attribute found on post-comments");
      return;
    }

    const postId = this.getAttribute("post");
    if (postId === null) {
      console.error("no post attribute found on post-comments");
      return;
    }

    fetch(
      `https://public.api.bsky.app/xrpc/app.bsky.feed.getPostThread?uri=${
        encodeURIComponent(`at://${profile}/app.bsky.feed.post/${postId}`)
      }`,
    ).then((res) =>
      res.json().then((res) => {
        console.log(res);
        shadow.append(new PostComment());
        // shadow.innerHTML = `
        //     <p>${res.thread.post.record.text}</p>
        //   `;
        // for (const reply of res.thread.replies) {
        //   console.log(reply);
        //   shadow.innerHTML = shadow.innerHTML +
        //     `<p>${reply.post.record.text}</p>`;
        // }
      })
    );
  }
}

customElements.define("post-comment", PostComment);
customElements.define("post-comments", PostComments);
