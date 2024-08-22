import React from 'react'
import { NodeHandler, NodeHandlers } from '@troop.com/tiptap-react-render'
import { cn } from './utils'

// handle the document
const doc: NodeHandler = props => <>{props.children}</>

// handle a paragraph
const paragraph: NodeHandler = props => {
	return <p className='mb-4'>{props.children}</p>
}

// handle text
const text: NodeHandler = props => {
	const { marks } = props.node
	// you could process text marks here from props.node.marks ...
	return (
		<span
			className={cn({
				'font-bold': marks?.some(mark => mark.type === 'bold'),
				italic: marks?.some(mark => mark.type === 'italic'),
				underline: marks?.some(mark => mark.type === 'underline'),
			})}
		>
			{props.node.text}
		</span>
	)
}

// handle an image
const img: NodeHandler = props => {
	const { src, alt, title } = props.node
	return <img src={src} alt={alt} title={title} />
}

// create a handlers wrapper
export const handlers: NodeHandlers = {
	doc: doc,
	text: text,
	paragraph: paragraph,
	img: img,
}
