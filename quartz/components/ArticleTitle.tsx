import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"

const ArticleTitle: QuartzComponent = ({ fileData, displayClass }: QuartzComponentProps) => {
  const title = fileData.frontmatter?.title
  if (title) {
     const clean = (name?: string) => name?.replace(/^\d+\s*-\s*/, "") ?? ""
    const cleanedTitle = title ? clean(title) : undefined
    return <h1 class={classNames(displayClass, "article-title")}>{cleanedTitle}</h1>
  } else {
    return null
  }
}

ArticleTitle.css = `
.article-title {
  margin: 2rem 0 0 0;
}
`

export default (() => ArticleTitle) satisfies QuartzComponentConstructor
