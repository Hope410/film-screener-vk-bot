import dayjs from 'dayjs';
import consts from './consts';
import VideoScreenerService from './services/VideoScreener.service';
import WallPosterService from './services/WallPoster.service';

// https://oauth.vk.com/authorize?client_id=7992418&scope=wall,photos&response_type=token&v=5.131

export default async function main() {
  const poster = new WallPosterService();
  const screener = new VideoScreenerService({
    videoSrc: './in/video.mp4'
  })

  const screens = await screener.run();

  for (let i = 0; i < screens.length; i++) {
    const screen = screens[i];

    await poster.post({screen, date: dayjs().add(consts.POST_PER_HOURS_VALUE * i, 'hours').unix()})
  }
}