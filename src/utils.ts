export const parseTime = (time: string) => {
  const [hh, mm, ss] = time.split(':').map(Number);

  return hh * 3600 + mm * 60 + ss;
}

export const formatTime = (time: number) => {
  return [
    Math.floor(time / 3600).toString().padStart(2, '0'),
    Math.floor((time % 3600) / 60).toString().padStart(2, '0'),
    Math.ceil(time % 60).toString().padStart(2, '0'),
  ].join(':')
}
