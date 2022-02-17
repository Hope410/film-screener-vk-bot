import { VK } from "vk-io";
import consts from "../consts";
import fs from 'fs/promises';
import { VideoScreen } from "../types";

export default class WallPosterService {
  private vk: VK;

  constructor() {

    this.vk = new VK({
      token: consts.USER_TOKEN
    });
  }

  async post(params: {
    screen: VideoScreen;
    date?: number;
  }) {
    console.info(`posting of ${params.screen.src} started`);

    const photoAttachment = await this.vk.upload.wallPhoto({
      group_id: -Number(consts.GROUP_ID),
      source: {
        value: await fs.readFile(params.screen.src),
      },
      caption: params.screen.time
    })
  
    await this.vk.api.wall.post({
      owner_id: Number(consts.GROUP_ID),
      from_group: true,
      attachments: `photo${photoAttachment.ownerId}_${photoAttachment.id}`,
      publish_date: params.date
    })

    console.info(`${params.screen.src} successfully posted`);
  }
}