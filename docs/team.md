---
layout: page
aside: false
---
<script setup>
import {
  VPTeamPage,
  VPTeamPageTitle,
  VPTeamMembers
} from 'vitepress/theme';

const members = [
  {
    avatar: 'http://q.qlogo.cn/headimg_dl?dst_uin=1471326733&spec=640&img_type=jpg',
    name: '二木',
    title: 'Creator',
    links: [
      { icon: 'github', link: 'https://github.com/woshiermuqwq' },
    ]
  },
  {
    avatar: 'http://q.qlogo.cn/headimg_dl?dst_uin=1523165110&spec=640&img_type=jpg',
    name: '枫溪',
    title: 'Developer',
    links: [
      { icon: 'github', link: 'https://github.com/FxRayHughes' },
    ]
  },
]
</script>

<VPTeamPage>
  <VPTeamMembers
    :members="members"
  />
  <VPTeamPageTitle>
    <template #lead>
      仅展示核心开发成员
    </template>
  </VPTeamPageTitle>
</VPTeamPage>