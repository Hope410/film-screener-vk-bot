import utils from 'util';
import * as cp from 'child_process'
import fs from 'fs/promises';

import { formatTime, parseTime } from '../utils';
import { VideoScreen } from '../types';

const exec = utils.promisify(cp.exec);

export default class VideoScreenerService {
  private videoSrc: string;

  constructor(options: {
    videoSrc: string;
  }) {
    this.videoSrc = options.videoSrc;
  }

  async run(): Promise<VideoScreen[]> {
    console.info('video procession started');
    const {stderr: videoInfo} = await exec(`ffprobe -i ${this.videoSrc}`);
    const res = videoInfo.match(/Duration: (?<duration>\d\d:\d\d:\d\d)/m);
    
    if (!res || !res.groups) {
      throw new Error('Can\'t get duration')
    }

    const {duration} = res.groups;
    console.info(`video duration: ${duration}`)

    const time = parseTime(duration);

    await exec(`ffmpeg -i ${this.videoSrc} -vf fps=1 -vsync 0 -frame_pts 1 './out/%d.jpg'`);
    console.info(`video successfully processed`)

    const files = await fs.readdir('./out');
    return files.map((file, i) => ({
      src: `./out/${file}`,
      time: formatTime((time / files.length) * i)
    }))
  }
}