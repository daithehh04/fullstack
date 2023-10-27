export function regexPhone(content) {
  const phoneRegex = /((0|\+84)\d{9})/g
  return content?.replace(phoneRegex,
    `<a href="tel:$1" target="_blank">$1</a>`
  );
}

export function regexEmail(content) {
  const emailRegex =
  /([\w]+(?:\.[\w]+)*@[\w]+(?:\.[\w]{2,})*)/g;
  return content?.replace(
  emailRegex,
  `<a href= "mailto:$1" target="_blank">$1</a>`
  );
}

export function regexLink(content) {
  const linkRegex =
  /(^(?:http|https):\/\/[\w\-\.]*[\w\-\.]+\.[a-z]{2,}(:\d+)?(\/?|\/[\w\-\/?=&+#\.]+))/gi
  return content?.replace(
    linkRegex,
    `<a href= "$1" target="_blank">$1</a>`
  );
}

export function regexYoutube(content) {
  const regexYoutube = /(?:http|https):\/\/(?:www\.)?youtube\.com\/watch\?v=([A-Za-z0-9_-]+)|youtu.be\/([A-Za-z0-9_-]+)/
    const result = content?.match(regexYoutube);
    let id
    if(result) {
      id = result[1] || result[2]
    }
   return content?.replace(
    regexYoutube,
    `<iframe width="560" height="315" src="https://www.youtube.com/embed/${id}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`
  );
}