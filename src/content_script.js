walk(document.body);

function walk(node) 
{
	// I stole this function from here:
	// http://is.gd/mwZp7E
	
	var child, next;
	
	var tagName = node.tagName ? node.tagName.toLowerCase() : "";
	// if (tagName == 'input' || tagName == 'textarea') {
	// 	return;
	// }
	// if (node.classList && node.classList.contains('ace_editor')) {
	// 	return;
	// }

	switch ( node.nodeType )  
	{
		case 1:  // Element
		case 9:  // Document
		case 11: // Document fragment
			child = node.firstChild;
			while ( child ) 
			{
				next = child.nextSibling;
				walk(child);
				child = next;
			}
			break;

		case 3: // Text node
			handleText(node);
			break;
	}
}

function handleText(textNode) 
{
	var v = textNode.nodeValue;

	v = v.replace(/\bLuiz Inácio Lula da Silva\b/gis, "Jair Bolsonaro");
	v = v.replace(/\bLula\b/gis, "Bolsonaro");
	v = v.replace(/\bJair Bolsonaro\b/gis, "Luiz Inácio Lula da Silva");
	v = v.replace(/\bJair Messias Bolsonaro\b/gis, "Luiz Inácio Lula da Silva");
	v = v.replace(/\bBolsonaro\b/gis, "Lula");

	debugger;
	
	textNode.nodeValue = v;
}


