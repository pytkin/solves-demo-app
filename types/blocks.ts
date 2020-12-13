export class Block {
  editing?: boolean;

  constructor (editing: boolean = false) {
    this.editing = editing;
  }
}

export interface TextBlock extends Block {
  text?: string;
  prevText?: string;
}

export class TextBlock extends Block {
  text?: string;
  prevText?: string;

  constructor(props: TextBlock) {
    const { editing, text = "", prevText = "" } = props;
    super(editing);
    this.text = text;
    this.prevText = prevText;
  }
}

export interface ImageBlock extends Block {
  image?: string;
}

export class ImageBlock extends Block {
  image?: string;

  constructor(props: ImageBlock) {
    const { editing, image = "" } = props;
    super(editing);
    this.image = image;
  }
}
