function Binary(x1, op, x2) {
	this.tag = op.tag;
	this.expr1 = x1;
	this.op = op;
	this.expr2 = x2;
}
function Unary(op, x) {
	this.tag = op.tag;
	this.op = op;
	this.expr = expr;
}
function Parent(x) {
	this.tag = '../';
	this.expr = x;
}

var parseExpr = function() {
	//----------------------------------------------

	/* state num: 48 */
	var nStart = 22;
	var tSymbols = ["$", "!", "!=", "%", "*", "+", "-", ".", "../", "/", "<", "<=", "==", ">", ">=", "[", "]", "boolean", "identifier", "null", "number", "string", "additive", "equality", "expr", "loc", "member", "multiplicative", "primary", "relation", "unary"];
	var tSymbolIndex = { "$": 0, "!": 1, "!=": 2, "%": 3, "*": 4, "+": 5, "-": 6, ".": 7, "../": 8, "/": 9, "<": 10, "<=": 11, "==": 12, ">": 13, ">=": 14, "[": 15, "]": 16, "boolean": 17, "identifier": 18, "null": 19, "number": 20, "string": 21, "additive": 22, "equality": 23, "expr": 24, "loc": 25, "member": 26, "multiplicative": 27, "primary": 28, "relation": 29, "unary": 30 };
	var tAction = [[, 1, , , , , 2, , 3, , , , , , , , , 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17], [, 1, , , , , 2, , 3, , , , , , , , , 4, 5, 6, 7, 8, , , , 12, 13, , 15, , 18], [, 1, , , , , 2, , 3, , , , , , , , , 4, 5, 6, 7, 8, , , , 12, 13, , 15, , 19], [, , , , , , , , 3, , , , , , , , , , 5, , , , , , , 20], [-26, , -26, -26, -26, -26, -26, -26, , -26, -26, -26, -26, -26, -26, -26, -26], [-28, , -28, -28, -28, -28, -28, -28, , -28, -28, -28, -28, -28, -28, -28, -28], [-27, , -27, -27, -27, -27, -27, -27, , -27, -27, -27, -27, -27, -27, -27, -27], [-25, , -25, -25, -25, -25, -25, -25, , -25, -25, -25, -25, -25, -25, -25, -25], [-24, , -24, -24, -24, -24, -24, -24, , -24, -24, -24, -24, -24, -24, -24, -24], [-5, , -5, , , 21, 22, , , , -5, -5, -5, -5, -5, , -5], [-1, , 23, , , , , , , , , , 24, , , , -1], [-32768], [-23, , -23, -23, -23, -23, -23, -23, , -23, -23, -23, -23, -23, -23, -23, -23], [-17, , -17, -17, -17, -17, -17, 25, , -17, -17, -17, -17, -17, -17, 26, -17], [-10, , -10, 27, 28, -10, -10, , , 29, -10, -10, -10, -10, -10, , -10], [-20, , -20, -20, -20, -20, -20, -20, , -20, -20, -20, -20, -20, -20, -20, -20], [-2, , -2, , , , , , , , 30, 31, -2, 32, 33, , -2], [-13, , -13, -13, -13, -13, -13, , , -13, -13, -13, -13, -13, -13, , -13], [-19, , -19, -19, -19, -19, -19, , , -19, -19, -19, -19, -19, -19, , -19], [-18, , -18, -18, -18, -18, -18, , , -18, -18, -18, -18, -18, -18, , -18], [-29, , -29, -29, -29, -29, -29, -29, , -29, -29, -29, -29, -29, -29, -29, -29], [, 1, , , , , 2, , 3, , , , , , , , , 4, 5, 6, 7, 8, , , , 12, 13, 34, 15, , 17], [, 1, , , , , 2, , 3, , , , , , , , , 4, 5, 6, 7, 8, , , , 12, 13, 35, 15, , 17], [, 1, , , , , 2, , 3, , , , , , , , , 4, 5, 6, 7, 8, 9, , , 12, 13, 14, 15, 36, 17], [, 1, , , , , 2, , 3, , , , , , , , , 4, 5, 6, 7, 8, 9, , , 12, 13, 14, 15, 37, 17], [, , , , , , , , , , , , , , , , , , 38], [, 1, , , , , 2, , 3, , , , , , , , , 4, 5, 6, 7, 8, 9, 10, 39, 12, 13, 14, 15, 16, 17], [, 1, , , , , 2, , 3, , , , , , , , , 4, 5, 6, 7, 8, , , , 12, 13, , 15, , 40], [, 1, , , , , 2, , 3, , , , , , , , , 4, 5, 6, 7, 8, , , , 12, 13, , 15, , 41], [, 1, , , , , 2, , 3, , , , , , , , , 4, 5, 6, 7, 8, , , , 12, 13, , 15, , 42], [, 1, , , , , 2, , 3, , , , , , , , , 4, 5, 6, 7, 8, 43, , , 12, 13, 14, 15, , 17], [, 1, , , , , 2, , 3, , , , , , , , , 4, 5, 6, 7, 8, 44, , , 12, 13, 14, 15, , 17], [, 1, , , , , 2, , 3, , , , , , , , , 4, 5, 6, 7, 8, 45, , , 12, 13, 14, 15, , 17], [, 1, , , , , 2, , 3, , , , , , , , , 4, 5, 6, 7, 8, 46, , , 12, 13, 14, 15, , 17], [-11, , -11, 27, 28, -11, -11, , , 29, -11, -11, -11, -11, -11, , -11], [-12, , -12, 27, 28, -12, -12, , , 29, -12, -12, -12, -12, -12, , -12], [-4, , -4, , , , , , , , 30, 31, -4, 32, 33, , -4], [-3, , -3, , , , , , , , 30, 31, -3, 32, 33, , -3], [-22, , -22, -22, -22, -22, -22, -22, , -22, -22, -22, -22, -22, -22, -22, -22], [, , , , , , , , , , , , , , , , 47], [-16, , -16, -16, -16, -16, -16, , , -16, -16, -16, -16, -16, -16, , -16], [-14, , -14, -14, -14, -14, -14, , , -14, -14, -14, -14, -14, -14, , -14], [-15, , -15, -15, -15, -15, -15, , , -15, -15, -15, -15, -15, -15, , -15], [-6, , -6, , , 21, 22, , , , -6, -6, -6, -6, -6, , -6], [-8, , -8, , , 21, 22, , , , -8, -8, -8, -8, -8, , -8], [-7, , -7, , , 21, 22, , , , -7, -7, -7, -7, -7, , -7], [-9, , -9, , , 21, 22, , , , -9, -9, -9, -9, -9, , -9], [-21, , -21, -21, -21, -21, -21, -21, , -21, -21, -21, -21, -21, -21, -21, -21]];
	var tRules = [null, [24, 23], [23, 29], [23, 23, 12, 29], [23, 23, 2, 29], [29, 22], [29, 29, 10, 22], [29, 29, 13, 22], [29, 29, 11, 22], [29, 29, 14, 22], [22, 27], [22, 22, 5, 27], [22, 22, 6, 27], [27, 30], [27, 27, 4, 30], [27, 27, 9, 30], [27, 27, 3, 30], [30, 26], [30, 6, 30], [30, 1, 30], [26, 28], [26, 26, 15, 24, 16], [26, 26, 7, 18], [28, 25], [28, 21], [28, 20], [28, 17], [28, 19], [25, 18], [25, 8, 25]];
	function parse(lexer) {
		var tFuncs = [, , , function($1, $2, $3) {
			var $$; $$ = new Binary($1, $2, $3); return $$;
		}, function($1, $2, $3) {
			var $$; $$ = new Binary($1, $2, $3); return $$;
		}, , function($1, $2, $3) {
			var $$; $$ = new Binary($1, $2, $3); return $$;
		}, function($1, $2, $3) {
			var $$; $$ = new Binary($1, $2, $3); return $$;
		}, function($1, $2, $3) {
			var $$; $$ = new Binary($1, $2, $3); return $$;
		}, function($1, $2, $3) {
			var $$; $$ = new Binary($1, $2, $3); return $$;
		}, , function($1, $2, $3) {
			var $$; $$ = new Binary($1, $2, $3); return $$;
		}, function($1, $2, $3) {
			var $$; $$ = new Binary($1, $2, $3); return $$;
		}, , function($1, $2, $3) {
			var $$; $$ = new Binary($1, $2, $3); return $$;
		}, function($1, $2, $3) {
			var $$; $$ = new Binary($1, $2, $3); return $$;
		}, function($1, $2, $3) {
			var $$; $$ = new Binary($1, $2, $3); return $$;
		}, , function($1, $2) {
			var $$; $$ = new Unary($1, $2); return $$;
		}, function($1, $2) {
			var $$; $$ = new Unary($1, $2); return $$;
		}, , function($1, $2, $3, $4) {
			var $$; $$ = new Binary($1, $2, $3); return $$;
		}, function($1, $2, $3) {
			var $$; $$ = new Binary($1, $2, $3); return $$;
		}, , , , , , , function($1, $2) {
			var $$; $$ = new Parent($2); return $$;
		}];
		function getToken() {
			return lexer.scan();
		}
		var s = 0; //初始状态
		var stk = [0];
		var a = getToken();
		var smb = [];
		var $smb = smb;
		var $top = 0;
		while (true) {
			var t = tAction[s][tSymbolIndex[a.tag]];
			if (t > 0) {
				stk.push(s = t);
				smb.push(a);
				a = getToken();
				++$top;
			}
			else if (t < 0 && t > -32768) {
				var idx = -t;
				var p = tRules[idx];
				var num = p.length - 1;
				stk.splice(stk.length - num, num);
				var t = stk[stk.length - 1];
				s = tAction[t][p[0]];
				stk.push(s);
				if (tFuncs[idx]) {
					var tmp = smb.splice(smb.length - num, num);
					var node = tFuncs[idx].apply(null, tmp);
					smb.push(node);
				}
				$top = smb.length - 1;
			}
			else if (t == -32768) {
				return smb[0];
			}
			else {
				throw Error("语法错误：" + lexer.getPos(a.index));
			}
		}
	};

	//----------------------------------------------
	"$", "!", "!=", "%", "*", "+", "-", ".", "../", "/", "<", "<=", "==", ">", ">=", "[", "]", "boolean", "identifier", "null", "number", "string";
	var re_ws = /[\t-\r \xA0]+/;
	var re_str = /"(?:[^"\\\r\n]|\\(?:[^\dxu\r]|x[\dA-Fa-f]{2}|u[\dA-Fa-f]{4}|\r\n?))*"|'(?:[^'\\\r\n]|\\(?:[^\dxu\r]|x[\dA-Fa-f]{2}|u[\dA-Fa-f]{4}|\r\n?))*'/;
	var re_num = /0x[\dA-Fa-f]+|(?:(?:0|[1-9]\d*)(?:\.\d*)?|\.\d+)(?:[eE][+-]?\d+)?/;
	var re_name = /[A-Za-z_][\dA-Za-z_]*/;
	var puncs = function(a) {
		a.sort().reverse();
		var re = /[()*+./?[\]{|}]/g;
		for (var i = 0; i < a.length; ++i)
			a[i] = a[i].replace(re, '\\$&');
		return a;
	}(["!", "!=", "%", "*", "+", "-", ".", "../", "/", "<", "<=", "==", ">", ">=", "[", "]"]);
	var re = RegExp('(' + re_str.source + ')'
		+ '|(' + re_num.source + ')'
		+ '|(' + re_name.source + ')'
		+ '|(' + puncs.join('|') + ')'
		+ '|(' + re_ws.source + ')'
		+ '|', 'g');
	function Lexer(s) {
		s = String(s);
		var i = 0;
		var L = s.length;
		function scan() {
			//alert(s.substring(i));
			var index = i;
			if (i == L)
				return new Token('$', '', index);

			re.lastIndex = i;
			var t = re.exec(s);
			if (t[0]) {
				i = re.lastIndex;
				if (t[1]) return new Token('string', eval(t[1]), index);
				if (t[2]) return new Token('number', eval(t[2]), index);
				if (t[3]) {
					switch (t[3]) {
						case 'true':
						case 'false':
							return new Token('boolean', eval(t[3]), index);
						case 'null':
							return new Token('null', null, index);
						default:
							return new Token('identifier', t[3], index);
					}
				}
				if (t[4]) {
					return new Token(t[4], t[4], index);
				}
				return scan();
			}
			throw Error("Lexer error: " + getPos(s, index));
		}

		return {
			scan: function() {
				var t = scan();
				//alert(t);
				return t;
			},
			getPos: function(pos) {
				return getPos(s, pos);
			}
		};
	}
	return function(s) {
		//alert(JSON.stringify(s));
		var lx = Lexer(s);
		var r = parse(lx);
		return r;
	};
}();
