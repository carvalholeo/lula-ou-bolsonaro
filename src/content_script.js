walk(document.body);

function walk(node) 
{
	// I stole this function from here:
	// http://is.gd/mwZp7E
	
	let child, next;
	
	let tagName = node.tagName ? node.tagName.toLowerCase() : "";
	if (tagName == 'input' || tagName == 'textarea') {
		return;
	}
	if (node.classList && node.classList.contains('ace_editor')) {
		return;
	}

	switch ( node.nodeType )  
	{
		case Node.ELEMENT_NODE:  // Element
		case Node.DOCUMENT_NODE:  // Document
		case Node.DOCUMENT_FRAGMENT_NODE: // Document fragment
			child = node.firstChild;
			while ( child ) 
			{
				next = child.nextSibling;
				walk(child);
				child = next;
			}
			break;

		case Node.TEXT_NODE: // Text node

			if(changeToLula(node.nodeValue)['status'] == 1) {
				node.nodeValue = changeToLula(node.nodeValue)['text'];
				break;

			} else if (changeToBolsonaro(node.nodeValue)['status'] == 1) {
				node.nodeValue = changeToBolsonaro(node.nodeValue)['text'];
				break;
			}
			
			break;
	}
}

function changeToLula(textNode) 
{

	const v = textNode
		.replace(/\bLuiz Inácio Lula da Silva\b/gims, 'Jair Messias Bolsonaro')
		.replace(/\bLula\b/gims, 'Bolsonaro')
		.replace(/\bLuiz Inácio da Silva\b/gims, 'Jair Bolsonaro');

	return configureResponse(textNode, v);
}

function changeToBolsonaro(textNode) {
	const v = textNode
		.replace(/\bJair Bolsonaro\b/gims, 'Luiz Inácio Lula da Silva')
		.replace(/\bJair Messias Bolsonaro\b/gims, 'Luiz Inácio Lula da Silva')
		.replace(/\bBolsonaro\b/gims, 'Lula');
	
	return configureResponse(textNode, v);
}

function configureResponse (original, replaced) {
	let status = 0;
	let response = [];

	if (original == replaced) {
		response = {
			status, 
			'text': original
		};

		return response;
	}

	status = 1;

	response = {
		status, 
		'text': replaced
	};

	return response;
}

