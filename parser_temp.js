/* state num: 29 */
var nStart = 12;
var tSymbols = ["$", ">", "attr_text", "each_begin", "each_end", "if_begin", "if_end", "tag_close", "tag_empty", "tag_expr", "tag_start", "text", "attr", "attrs", "html", "program", "stmt", "stmt_each", "stmt_expr", "stmt_if", "stmts", "tag_open", "template"];
var tSymbolIndex = { "$": 0, ">": 1, "attr_text": 2, "each_begin": 3, "each_end": 4, "if_begin": 5, "if_end": 6, "tag_close": 7, "tag_empty": 8, "tag_expr": 9, "tag_start": 10, "text": 11, "attr": 12, "attrs": 13, "html": 14, "program": 15, "stmt": 16, "stmt_each": 17, "stmt_expr": 18, "stmt_if": 19, "stmts": 20, "tag_open": 21, "template": 22 };
var tAction = [[-2, , , -2, , -2, , , -2, -2, -2, -2, , , , , , , , , 1, , 2], [-1, , , 3, , 4, , , 5, 6, 7, 8, , , 9, 10, 11, 12, 13, 14, , 15], [-32768], [, , , -2, -2, -2, , , -2, -2, -2, -2, , , , , , , , , 16], [, , , -2, , -2, -2, , -2, -2, -2, -2, , , , , , , , , 17], [, -10, -10, -10, , -10, , , , -10, , , , 18], [-19, -19, -19, -19, -19, -19, -19, -19, -19, -19, -19, -19], [, -10, -10, -10, , -10, , , , -10, , , , 19], [-4, , , -4, -4, -4, -4, -4, -4, -4, -4, -4], [-5, , , -5, -5, -5, -5, -5, -5, -5, -5, -5], [-6, , , -6, -6, -6, -6, -6, -6, -6, -6, -6], [-3, , , -3, -3, -3, -3, -3, -3, -3, -3, -3], [-15, -15, -15, -15, -15, -15, -15, -15, -15, -15, -15, -15], [-16, -16, -16, -16, -16, -16, -16, -16, -16, -16, -16, -16], [-14, -14, -14, -14, -14, -14, -14, -14, -14, -14, -14, -14], [, , , -2, , -2, , -2, -2, -2, -2, -2, , , , , , , , , 20], [, , , 3, 21, 4, , , 5, 6, 7, 8, , , 9, 10, 11, 12, 13, 14, , 15], [, , , 3, , 4, 22, , 5, 6, 7, 8, , , 9, 10, 11, 12, 13, 14, , 15], [, 23, 24, 3, , 4, , , , 6, , , 25, , , 26, , 12, 13, 14], [, 27, 24, 3, , 4, , , , 6, , , 25, , , 26, , 12, 13, 14], [, , , 3, , 4, , 28, 5, 6, 7, 8, , , 9, 10, 11, 12, 13, 14, , 15], [-18, -18, -18, -18, -18, -18, -18, -18, -18, -18, -18, -18], [-17, -17, -17, -17, -17, -17, -17, -17, -17, -17, -17, -17], [-8, , , -8, -8, -8, -8, -8, -8, -8, -8, -8], [, -12, -12, -12, , -12, , , , -12], [, -11, -11, -11, , -11, , , , -11], [, -13, -13, -13, , -13, , , , -13], [, , , -9, , -9, , -9, -9, -9, -9, -9], [-7, , , -7, -7, -7, -7, -7, -7, -7, -7, -7]];
var tRules = [null, [22, 20], [20], [20, 20, 16], [16, 11], [16, 14], [16, 15], [14, 21, 20, 7], [14, 8, 13, 1], [21, 10, 13, 1], [13], [13, 13, 12], [12, 2], [12, 15], [15, 19], [15, 17], [15, 18], [19, 5, 20, 6], [17, 3, 20, 4], [18, 9]];
function parse(lexer) {
	var tFuncs = [, , function() {
		var $$; $$ = []; return $$;
	}, function($1, $2) {
		var $$; $1.push($2); $$ = $1; return $$;
	}, , , , function($1, $2, $3) {
		var $$; if ($1.tagName != $3.tagName) throw Error("标签不匹配: " + lexer.getPos($3.index));
		$$ = new HtmlTag($1.tagName, $1.attrs, $2);
		return $$;
	}, function($1, $2, $3) {
		var $$; $$ = new EmptyTag($1.tagName, $2, $1.index); return $$;
	}, function($1, $2, $3) {
		var $$;
		if (!$1.isEmpty && $3.lexeme == '/>')
			throw Error("非空标签不允许 /> 关闭: " + lexer.getPos($3.index));
		$$ = new TagOpen($1.tagName, $2, $1.index);
		return $$;
	}, function() {
		var $$; $$ = []; return $$;
	}, function($1, $2) {
		var $$; $1.push($2); $$ = $1; return $$;
	}, , , , , , function($1, $2, $3) {
		var $$; $$ = new If($1.expr, $2); return $$;
	}, function($1, $2, $3) {
		var $$; $$ = new Each($1.expr, $2); return $$;
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
