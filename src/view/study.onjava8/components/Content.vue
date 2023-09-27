<template>
  <div>
    <v-md-editor v-model="content" mode="preview" :default-show-toc="true"></v-md-editor>
  </div>
</template>

<script lang="ts">
import { Vue, Options, Prop } from 'vue-property-decorator';
import introduction from '../book/00-Introduction.md?raw';
// import onJava8 from '../book/00-On-Java-8.md?raw';
// import preface from '../book/00-Preface.md?raw';
// import p1 from '../book/01-What-is-an-Object.md?raw';
// import p2 from '../book/02-Installing-Java-and-the-Book-Examples.md?raw';
// import p3 from '../book/03-Objects-Everywhere.md?raw';
// import p4 from '../book/04-Operators.md?raw';
// import p5 from '../book/05-Control-Flow.md?raw';
// import p6 from '../book/06-Housekeeping.md?raw';
// import p7 from '../book/07-Implementation-Hiding.md?raw';
// import p8 from '../book/08-Reuse.md?raw';
// import p9 from '../book/09-Polymorphism.md?raw';
// import p10 from '../book/10-Interfaces.md?raw';
// import p11 from '../book/11-Inner-Classes.md?raw';
// import p12 from '../book/12-Collections.md?raw';
// import p13 from '../book/13-Functional-Programming.md?raw';
// import p14 from '../book/14-Streams.md?raw';
// import p15 from '../book/15-Exceptions.md?raw';
// import p16 from '../book/16-Validating-Your-Code.md?raw';
// import p17 from '../book/17-Files.md?raw';
// import p18 from '../book/18-Strings.md?raw';
// import p19 from '../book/19-Type-Information.md?raw';
// import p20 from '../book/20-Generics.md?raw';
// import p21 from '../book/21-Arrays.md?raw';
// import p22 from '../book/22-Enumerations.md?raw';
// import p23 from '../book/23-Annotations.md?raw';
// import p24 from '../book/24-Concurrent-Programming.md?raw';
// import p25 from '../book/25-Patterns.md?raw';

@Options({})
export default class Content extends Vue {
  @Prop({ required: false, type: String })
  path!: string;

  @Prop({ required: true, type: String })
  fileName!: string;

  content: any = '';

  staticPath: any = '@/view/study.onjava8/book/';
  strPostFix: any = '?raw';

  mounted() {
    this.getFile();
  }

  async getFile() {
    this.content = introduction;
    // todo 如何读取文件
    // if (this.path.indexOf('#') !== -1) {
    //   await import('@/view/study.onjava8/book/' + this.path.substring(0, this.path.indexOf("#")) + '?raw').then(res => {
    //     this.content = res;
    //   })
    // } else {
    //   await import('@/view/study.onjava8/book/' + this.path + '?raw').then(res => {
    //     console.log('get file: ', res)
    //     this.content = res;
    //   })
    // }
    // console.log('will rea file: ', this.path);
    // const buffer = fs.readFile(this.path, 'utf-8', (error: any, data: any) => {});
    // console.log('file content: ', import('./' + this.path + '?raw'));
    // switch(this.fileName) {
    //   case 'introduction':
    //     this.content = introduction;
    //     break;
    //   case 'onJava8':
    //     this.content = onJava8;
    //     break;
    //   case 'preface':
    //     this.content = preface
    //     break;
    //   case 'p1':
    //     this.content = p1
    //     break;
    //   case 'p2':
    //     this.content = p2
    //     break;
    //   case 'p3':
    //     this.content = p4
    //     break;
    //   case 'p4':
    //     this.content = p4
    //     break;
    //   case 'p5':
    //     this.content = p5
    //     break;
    //   case 'p6':
    //     this.content = p6
    //     break;
    //   case 'p7':
    //     this.content = p7
    //     break;
    //   case 'p8':
    //     this.content = p8
    //     break;
    //   case 'p9':
    //     this.content = p9
    //     break;
    //   case 'p10':
    //     this.content = p10
    //     break;
    //   case 'p11':
    //     this.content = p11
    //     break;
    //   case 'p12':
    //     this.content = p12
    //     break;
    //   case 'p13':
    //     this.content = p13
    //     break;
    //   default:
    // }
  }
}
</script>

<style scoped lang="less">
:deep(::-webkit-scrollbar) {
  width: 0;
  height: 0;
  color: transparent;
}
:deep(::-webkit-scrollbar-thumb) {
  background-color: transparent;
  border-radius: 0;
  border: 0;
}
</style>