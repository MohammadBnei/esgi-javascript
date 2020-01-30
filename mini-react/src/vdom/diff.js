import render from './render'

const zip = (xs, ys) => {
	const zipped = []

	for (let i = 0; i < Math.min(xs.length, ys.length); i++) {
		zipped.push([xs[i], ys[i]])
	}

	return zipped
}

const diffAttrs = (oldAttrs, newAttrs) => {
	const patches = []
	
	for (const [k, v] of Object.entries(newAttrs)) {
		patches.push($node => {
			$node.setAttribute(k, v)
			return $node
		})
	}

	for (const k in oldAttrs) {
		if (!(k in newAttrs)) {
			patches.push($node => {
				$node.removeAttribute(k)
				return $node
			})
		}
	}

	return $node => {
		for (const patch of patches) {
			patch($node)
		}

		return $node
	}
}

const diffChildren = (oldVChildren, newVChildren) => {
	const childPatches = []

	oldVChildren.forEach((oldVChild, i) => {
		childPatches.push(diff(oldVChild, newVChildren[i]))
	})

	const additionalPatches = []
	for (const additionalVChild of newVChildren.slice(oldVChildren.length)) {
		additionalPatches.push($node => {
			$node.appendChild(render(additionalVChild))
			return $node
		})
	}

	return $parent => {
		console.log(childPatches.length, $parent.childNodes.length);
		for (const [patch, $child] of zip(childPatches, $parent.childNodes)) {
			patch($child)
		}

		for (const patch of additionalPatches) {
			patch($parent)
		}

		return $parent
	}
}

const diff = (vOldNode, vNewNode) => {
	if (vNewNode === undefined) {
		return $node => {
			$node.remove()

			return undefined
		}
	}
	if (vOldNode.tagName !== vNewNode.tagName) {
		return $node => {
			const $newNode = render(vNewNode)
			$node.replaceWith(render(vNewNode))
			return $newNode
		}
	}
 
	if (typeof vOldNode === 'string' || typeof vNewNode === 'string') {
		if (vOldNode !== vNewNode) {
			return $node => {
				const $newNode = render(vNewNode)
				$node.replaceWith()
				return $newNode
			}
		} else {
			return $node => $node
		}
	}

	const patchAttrs = diffAttrs(vOldNode.attrs, vNewNode.attrs)
	const patchChildren = diffChildren(vOldNode.children, vNewNode.children)
	
	return $node => {
		patchAttrs($node)
		patchChildren($node)
		return $node
	}
}

export default diff