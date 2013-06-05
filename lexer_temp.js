function getPos(s, index) {
	var t = s.substring(0, index);
	var re_nl = /\r\n?|\n/g;
	var m = t.match(re_nl);
	var row = 1;
	if (m) {
		row += m.length;
	}
	var col = 1 + /[^\r\n]*$/.exec(t)[0].length;
	return new Position(row, col);
}
function Position(row, col) {
	this.row = row;
	this.col = col;
}
Position.prototype = {
	toString: function() {
		return '(' + this.row + ',' + this.col + ')';
	}
};

function Class(base, constructor, prototype) {
	function f() { }
	f.prototype = base.prototype;
	var t = new f;
	if (prototype) {
		for (var i in prototype)
			t[i] = prototype[i];
	}
	if (!constructor)
		constructor = f;
	constructor.prototype = t;
	return constructor;
}
function Token(tag, s, i) {
	this.tag = tag;
	this.lexeme = s;
	this.index = i;
}
Token.prototype.toString = function() {
	return JSON.stringify(this);
};
var TagStart = Class(Token, function(s, index) {
	var tagName = /<(\w+)/.exec(s)[1];
	Token.call(this, (this.isEmpty = isEmpty(tagName)) ? 'tag_empty' : 'tag_start', s, index);
	this.tagName = tagName;
});
var TagClose = Class(Token, function(s, index) {
	var tagName = s.slice(2, -1);
	Token.call(this, 'tag_close', s, index);
	this.tagName = tagName;
});
var TagOpen = function(tagName, attrs, index) {
	this.tagName = tagName;
	this.attrs = attrs;
	this.index = index;
};
function HtmlTag(tagName, attrs, childNodes) {
	this.tag = 'htmlTag';
	this.tagName = tagName;
	this.attrs = attrs;
	this.childNodes = childNodes;
}
function EmptyTag(tagName, attrs) {
	this.tag = 'emptyTag';
	this.tagName = tagName;
	this.attrs = attrs;
}

function If(expr, body) {
	this.tag = 'if';
	this.expr = expr;
	this.body = body;
}
function Each(expr, body) {
	this.tag = 'each';
	this.expr = expr;
	this.body = body;
}

function isEmpty(s) {
	return /^(?:BASEFONT|BR|AREA|LINK|IMG|PARAM|HR|INPUT|COL|ISINDEX|BASE|META)$/i.test(s);
}
function trim(s) {
	return s.replace(/^\s+|\s+$/g, '');
}
function getExpr(s) {
	try {
		var r = trim(s.slice(/{{#(?:if|each)/.exec(s)[0].length, -2));
	} catch (e) { alert(s); throw e; }
	return r;
}
function getTagType(s) {
	var re = /^{{([#/]?\w+)/;
	var t = re.exec(s);
	if (t) {
		switch (t[1]) {
			case '#if': return 'if_begin';
			case '/if': return 'if_end';
			case '#each': return 'each_begin';
			case '/each': return 'each_end';
			default: return 'tag_expr';
		}
	}
	throw Error("未知 tag");
}
function parseTag(s, index) {
	var tag = getTagType(s);
	var tk = new Token(tag, s, index);
	switch (tag) {
		case 'if_begin':
		case 'each_begin':
			tk.expr = parseExpr(getExpr(s));
	}
	return tk;
}
function parseTagExpr(s, index) {
	var tk = new Token('tag_expr', s, index);
	tk.expr = parseExpr(s.slice(3, -3));
	return tk;
}

function Lexer(s) {
	var i = 0;
	var L = (s = String(s)).length;
	var inTag = false;
	var inTagCode = false;

	var re_inTag = /\s*(?:(\/?>)|([\w-]+(?:=(?:"[^"]*"|'[^']*'|[^\s>]+))?)|({{(?:[^{}"]|"(?:[^"]|\\[\s\S])*")+}})|({{{(?:[^{}"]|"(?:[^"]|\\[\s\S])*")+}}}))|/g;
	var re_inTagCode = /({{(?:[^{}"]|"(?:[^"]|\\[\s\S])*")+}})|({{{(?:[^{}"]|"(?:[^"]|\\[\s\S])*")+}}})|(?:[^\\]|\\[\s\S])*?(?=$|{{)|/g;
	var re_common = /(<\w+)|(<\/\w+>)|({{(?:[^{}"]|"(?:[^"]|\\[\s\S])*")+}})|({{{(?:[^{}"]|"(?:[^"]|\\[\s\S])*")+}}})|((?:[^\\]|\\[\s\S])*?(?=$|<\/?\w|{{))/g;

	function match(re) {
		re.lastIndex = i;
		var t = re.exec(s);
		return t[0];
	}

	var j = 0;
	function parse() {
		var index = i;
		if (i == L)
			return new Token('$', '', index);

		if (inTag) {
			if (inTagCode == false) {
				re_inTag.lastIndex = i;
				var t = re_inTag.exec(s);
				if (t[0]) {
					i = re_inTag.lastIndex;
					if (t[1]) {
						inTag = false;
						return new Token('>', t[1], index);
					}
					if (t[2]) {
						return new Token('attr_text', t[2], index);
					}
					if (t[3]) {
						j = 1;
						inTagCode = true;
						return parseTag(t[3], index);
					}
					return parseTagExpr(t[4], index);
				}
			}
			else {
				re_inTagCode.lastIndex = i;
				t = re_inTagCode.exec(s);
				if (t[0]) {
					i = re_inTagCode.lastIndex;
					if (t[1]) {
						var tag = parseTag(t[1]);
						if (/_end$/.test(tag.tag))--j;
						else ++j;
						inTagCode = j > 0;
						return tag;
					}
					if (t[2]) {
						return parseTagExpr(t[2], index);
					}
					return new Token('text', t[0], index);
				}
			}
		}
		else {
			re_common.lastIndex = i;
			var t = re_common.exec(s);
			if (t[0]) {
				i = re_common.lastIndex;
				if (t[1]) {
					inTag = true;
					return new TagStart(t[1], index);
				}
				if (t[2]) {
					return new TagClose(t[2], index);
				}
				if (t[3]) {
					var tag = parseTag(t[3]);
					return tag;
				}
				if (t[4]) {
					return parseTagExpr(t[4], index);
				}
				return new Token('text', t[0], index);
			}
		}
		throw Error("Lexer error: " + getPos(s, i));
	}

	var tka = [];
	return {
		scan: function() {
			var t = parse();
			if (!(t instanceof Token)) throw 1;
			tka.push(t);
			return t;
		},
		getPos: function(a) {
			return getPos(s, a);
		},
		tks: function() {
			return tka;
		}
	};
}
