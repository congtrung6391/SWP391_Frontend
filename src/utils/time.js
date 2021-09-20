const formatDuration = (durationRaw) => {
  const duration = parseInt(durationRaw, 10);
  if (duration < 60) {
    return `${duration} giây`;
  }
  if (duration < 3600) {
    const minutes = Math.floor(duration / 60);
    if (minutes * 60 === duration) {
      return `${Math.floor(duration / 60)} phút`;
    }
    const secondLeft = duration - minutes * 60;
    return `${minutes} phút ${formatDuration(secondLeft)}`;
  }
  if (duration < 86400) {
    const hours = Math.floor(duration / 3600);
    if (hours * 3600 === duration) {
      return `${hours} giờ`;
    }
    const secondLeft = duration - hours * 3600;
    return `${hours} giờ ${formatDuration(secondLeft)}`;
  }

  const days = Math.floor(duration / 86400);
  if (days * 86400 === duration) {
    return `${days} ngày`;
  }
  const secondLeft = duration - days * 86400;
  return `${days} ngày ${formatDuration(secondLeft)}`;
};

export default formatDuration;
