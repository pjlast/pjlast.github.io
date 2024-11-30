"use strict";

class PostComment extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    this.attachShadow({ mode: "open" });
    this.innerHTML = "Hello";
  }
}

/** 
 * @typedef {{
 *   thread: {
 *     post: {
 *       author: {
 *         avatar: string,
 *         displayName: string
 *       },
 *       record: {
 *         text: string
 *       }
 *     },
 *     replies: []
 *   }
 * }} BlueskyThread
 */

/**
 * Fetches a post from the provided profile.
 *
 * @param {string} profile Profile the post belongs to.
 * @param {string} postId ID of the post.
 *
 * @returns {Promise<BlueskyThread>} The specified post with its thread.
 *
 * @throws Will throw if an error occurs.
 */
async function getBlueskyPostThread(profile, postId) {
  /** @type {Response} */
  let response;
  try {
    const url = new URL(
      "/xrpc/app.bsky.feed.getPostThread",
      "https://public.api.bsky.app"
    );
    url.search = `?uri=${encodeURIComponent(`at://${profile}/app.bsky.feed.post/${postId}`)}`;

    response = await fetch(url);
  } catch (error) {
    throw new Error(`Fetch error: ${error} `);
  }

  if (!response.ok) {
    throw new Error(`HTTP error: ${response.status} ${response.statusText} `);
  }

  /** @type {BlueskyThread} */
  let body;
  try {
    body = await response.json();
  }
  catch (error) {
    throw new Error(`Failed to parse JSON: ${error} `);
  }

  return body;
}

class Post extends HTMLElement {
  constructor() {
    super();
  }

  async connectedCallback() {
    const shadow = this.attachShadow({ mode: "open" });

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

    /** @type {BlueskyThread} */
    let postThread;
    try {
      postThread = await getBlueskyPostThread(profile, postId);
    }
    catch (error) {
      console.error("Error while fetching thread:", error);
      return;
    }

    const name = document.createElement("h2");
    name.textContent = postThread.thread.post.author.displayName;
    shadow.append(name);

    const profilePicture = document.createElement("img");
    profilePicture.src = postThread.thread.post.author.avatar;
    profilePicture.alt = postThread.thread.post.author.displayName;
    shadow.append(profilePicture);

    const postContent = document.createElement("p");
    postContent.textContent = postThread.thread.post.record.text;
    shadow.append(postContent);

    console.log(postThread);
    // shadow.innerHTML = `
    //     <p>${res.thread.post.record.text}</p>
    //   `;
    // for (const reply of res.thread.replies) {
    //   console.log(reply);
    //   shadow.innerHTML = shadow.innerHTML +
    //     `<p>${reply.post.record.text}</p>`;
    // }
  }
}

customElements.define("post-comment", PostComment);
customElements.define("post-comments", Post);
