function snip(bad, limit) {
  limit = limit || 36;

  var good = "";

  bad.split(/\s+/g).forEach(function(word) {
    if (good.length < limit) {
      good += (good.length ? " " : "") + word;
    }
  });

  if (good.length > limit) good.slice(0, limit);

  return good + (good.length != bad.length ? " ..." : "");
}
