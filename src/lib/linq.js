﻿/*--------------------------------------------------------------------------
* linq.js - LINQ for JavaScript
* ver 2.2.0.2 (Jan. 21th, 2011)
*
* created and maintained by neuecc <ils@neue.cc>
* licensed under Microsoft Public License(Ms-PL)
* http://neue.cc/
* http://linqjs.codeplex.com/
*--------------------------------------------------------------------------*/
Enumerable=function(){var m="Single:sequence contains more than one element.",e=true,b=null,a=false,c=function(a){this.GetEnumerator=a};c.Choice=function(){var a=arguments[0]instanceof Array?arguments[0]:arguments;return new c(function(){return new f(g.Blank,function(){return this.Yield(a[Math.floor(Math.random()*a.length)])},g.Blank)})};c.Cycle=function(){var a=arguments[0]instanceof Array?arguments[0]:arguments;return new c(function(){var b=0;return new f(g.Blank,function(){if(b>=a.length)b=0;return this.Yield(a[b++])},g.Blank)})};c.Empty=function(){return new c(function(){return new f(g.Blank,function(){return a},g.Blank)})};c.From=function(j){if(j==b)return c.Empty();if(j instanceof c)return j;if(typeof j==i.Number||typeof j==i.Boolean)return c.Repeat(j,1);if(typeof j==i.String)return new c(function(){var b=0;return new f(g.Blank,function(){return b<j.length?this.Yield(j.charAt(b++)):a},g.Blank)});if(typeof j!=i.Function){if(typeof j.length==i.Number)return new h(j);if(!(j instanceof Object)&&d.IsIEnumerable(j))return new c(function(){var c=e,b;return new f(function(){b=new Enumerator(j)},function(){if(c)c=a;else b.moveNext();return b.atEnd()?a:this.Yield(b.item())},g.Blank)})}return new c(function(){var b=[],c=0;return new f(function(){for(var a in j)!(j[a]instanceof Function)&&b.push({Key:a,Value:j[a]})},function(){return c<b.length?this.Yield(b[c++]):a},g.Blank)})},c.Return=function(a){return c.Repeat(a,1)};c.Matches=function(h,e,d){if(d==b)d="";if(e instanceof RegExp){d+=e.ignoreCase?"i":"";d+=e.multiline?"m":"";e=e.source}if(d.indexOf("g")===-1)d+="g";return new c(function(){var b;return new f(function(){b=new RegExp(e,d)},function(){var c=b.exec(h);return c?this.Yield(c):a},g.Blank)})};c.Range=function(e,d,a){if(a==b)a=1;return c.ToInfinity(e,a).Take(d)};c.RangeDown=function(e,d,a){if(a==b)a=1;return c.ToNegativeInfinity(e,a).Take(d)};c.RangeTo=function(d,e,a){if(a==b)a=1;return d<e?c.ToInfinity(d,a).TakeWhile(function(a){return a<=e}):c.ToNegativeInfinity(d,a).TakeWhile(function(a){return a>=e})};c.Repeat=function(d,a){return a!=b?c.Repeat(d).Take(a):new c(function(){return new f(g.Blank,function(){return this.Yield(d)},g.Blank)})};c.RepeatWithFinalize=function(a,e){a=d.CreateLambda(a);e=d.CreateLambda(e);return new c(function(){var c;return new f(function(){c=a()},function(){return this.Yield(c)},function(){if(c!=b){e(c);c=b}})})};c.Generate=function(a,e){if(e!=b)return c.Generate(a).Take(e);a=d.CreateLambda(a);return new c(function(){return new f(g.Blank,function(){return this.Yield(a())},g.Blank)})};c.ToInfinity=function(d,a){if(d==b)d=0;if(a==b)a=1;return new c(function(){var b;return new f(function(){b=d-a},function(){return this.Yield(b+=a)},g.Blank)})};c.ToNegativeInfinity=function(d,a){if(d==b)d=0;if(a==b)a=1;return new c(function(){var b;return new f(function(){b=d+a},function(){return this.Yield(b-=a)},g.Blank)})};c.Unfold=function(h,b){b=d.CreateLambda(b);return new c(function(){var d=e,c;return new f(g.Blank,function(){if(d){d=a;c=h;return this.Yield(c)}c=b(c);return this.Yield(c)},g.Blank)})};c.prototype={CascadeBreadthFirst:function(g,b){var h=this;g=d.CreateLambda(g);b=d.CreateLambda(b);return new c(function(){var i,k=0,j=[];return new f(function(){i=h.GetEnumerator()},function(){while(e){if(i.MoveNext()){j.push(i.Current());return this.Yield(b(i.Current(),k))}var f=c.From(j).SelectMany(function(a){return g(a)});if(!f.Any())return a;else{k++;j=[];d.Dispose(i);i=f.GetEnumerator()}}},function(){d.Dispose(i)})})},CascadeDepthFirst:function(g,b){var h=this;g=d.CreateLambda(g);b=d.CreateLambda(b);return new c(function(){var j=[],i;return new f(function(){i=h.GetEnumerator()},function(){while(e){if(i.MoveNext()){var f=b(i.Current(),j.length);j.push(i);i=c.From(g(i.Current())).GetEnumerator();return this.Yield(f)}if(j.length<=0)return a;d.Dispose(i);i=j.pop()}},function(){try{d.Dispose(i)}finally{c.From(j).ForEach(function(a){a.Dispose()})}})})},Flatten:function(){var h=this;return new c(function(){var j,i=b;return new f(function(){j=h.GetEnumerator()},function(){while(e){if(i!=b)if(i.MoveNext())return this.Yield(i.Current());else i=b;if(j.MoveNext())if(j.Current()instanceof Array){d.Dispose(i);i=c.From(j.Current()).SelectMany(g.Identity).Flatten().GetEnumerator();continue}else return this.Yield(j.Current());return a}},function(){try{d.Dispose(j)}finally{d.Dispose(i)}})})},Pairwise:function(b){var e=this;b=d.CreateLambda(b);return new c(function(){var c;return new f(function(){c=e.GetEnumerator();c.MoveNext()},function(){var d=c.Current();return c.MoveNext()?this.Yield(b(d,c.Current())):a},function(){d.Dispose(c)})})},Scan:function(i,g,j){if(j!=b)return this.Scan(i,g).Select(j);var h;if(g==b){g=d.CreateLambda(i);h=a}else{g=d.CreateLambda(g);h=e}var k=this;return new c(function(){var b,c,j=e;return new f(function(){b=k.GetEnumerator()},function(){if(j){j=a;if(!h){if(b.MoveNext())return this.Yield(c=b.Current())}else return this.Yield(c=i)}return b.MoveNext()?this.Yield(c=g(c,b.Current())):a},function(){d.Dispose(b)})})},Select:function(b){var e=this;b=d.CreateLambda(b);return new c(function(){var c,g=0;return new f(function(){c=e.GetEnumerator()},function(){return c.MoveNext()?this.Yield(b(c.Current(),g++)):a},function(){d.Dispose(c)})})},SelectMany:function(g,e){var h=this;g=d.CreateLambda(g);if(e==b)e=function(b,a){return a};e=d.CreateLambda(e);return new c(function(){var j,i=undefined,k=0;return new f(function(){j=h.GetEnumerator()},function(){if(i===undefined)if(!j.MoveNext())return a;do{if(i==b){var f=g(j.Current(),k++);i=c.From(f).GetEnumerator()}if(i.MoveNext())return this.Yield(e(j.Current(),i.Current()));d.Dispose(i);i=b}while(j.MoveNext());return a},function(){try{d.Dispose(j)}finally{d.Dispose(i)}})})},Where:function(b){b=d.CreateLambda(b);var e=this;return new c(function(){var c,g=0;return new f(function(){c=e.GetEnumerator()},function(){while(c.MoveNext())if(b(c.Current(),g++))return this.Yield(c.Current());return a},function(){d.Dispose(c)})})},OfType:function(c){var a;switch(c){case Number:a=i.Number;break;case String:a=i.String;break;case Boolean:a=i.Boolean;break;case Function:a=i.Function;break;default:a=b}return a===b?this.Where(function(a){return a instanceof c}):this.Where(function(b){return typeof b===a})},Zip:function(e,b){b=d.CreateLambda(b);var g=this;return new c(function(){var i,h,j=0;return new f(function(){i=g.GetEnumerator();h=c.From(e).GetEnumerator()},function(){return i.MoveNext()&&h.MoveNext()?this.Yield(b(i.Current(),h.Current(),j++)):a},function(){try{d.Dispose(i)}finally{d.Dispose(h)}})})},Join:function(m,i,h,k,j){i=d.CreateLambda(i);h=d.CreateLambda(h);k=d.CreateLambda(k);j=d.CreateLambda(j);var l=this;return new c(function(){var n,q,o=b,p=0;return new f(function(){n=l.GetEnumerator();q=c.From(m).ToLookup(h,g.Identity,j)},function(){while(e){if(o!=b){var c=o[p++];if(c!==undefined)return this.Yield(k(n.Current(),c));c=b;p=0}if(n.MoveNext()){var d=i(n.Current());o=q.Get(d).ToArray()}else return a}},function(){d.Dispose(n)})})},GroupJoin:function(l,h,e,j,i){h=d.CreateLambda(h);e=d.CreateLambda(e);j=d.CreateLambda(j);i=d.CreateLambda(i);var k=this;return new c(function(){var m=k.GetEnumerator(),n=b;return new f(function(){m=k.GetEnumerator();n=c.From(l).ToLookup(e,g.Identity,i)},function(){if(m.MoveNext()){var b=n.Get(h(m.Current()));return this.Yield(j(m.Current(),b))}return a},function(){d.Dispose(m)})})},All:function(b){b=d.CreateLambda(b);var c=e;this.ForEach(function(d){if(!b(d)){c=a;return a}});return c},Any:function(c){c=d.CreateLambda(c);var b=this.GetEnumerator();try{if(arguments.length==0)return b.MoveNext();while(b.MoveNext())if(c(b.Current()))return e;return a}finally{d.Dispose(b)}},Concat:function(e){var g=this;return new c(function(){var i,h;return new f(function(){i=g.GetEnumerator()},function(){if(h==b){if(i.MoveNext())return this.Yield(i.Current());h=c.From(e).GetEnumerator()}return h.MoveNext()?this.Yield(h.Current()):a},function(){try{d.Dispose(i)}finally{d.Dispose(h)}})})},Insert:function(h,b){var g=this;return new c(function(){var j,i,l=0,k=a;return new f(function(){j=g.GetEnumerator();i=c.From(b).GetEnumerator()},function(){if(l==h&&i.MoveNext()){k=e;return this.Yield(i.Current())}if(j.MoveNext()){l++;return this.Yield(j.Current())}return!k&&i.MoveNext()?this.Yield(i.Current()):a},function(){try{d.Dispose(j)}finally{d.Dispose(i)}})})},Alternate:function(a){a=c.Return(a);return this.SelectMany(function(b){return c.Return(b).Concat(a)}).TakeExceptLast()},Contains:function(f,b){b=d.CreateLambda(b);var c=this.GetEnumerator();try{while(c.MoveNext())if(b(c.Current())===f)return e;return a}finally{d.Dispose(c)}},DefaultIfEmpty:function(b){var g=this;return new c(function(){var c,h=e;return new f(function(){c=g.GetEnumerator()},function(){if(c.MoveNext()){h=a;return this.Yield(c.Current())}else if(h){h=a;return this.Yield(b)}return a},function(){d.Dispose(c)})})},Distinct:function(a){return this.Except(c.Empty(),a)},Except:function(e,b){b=d.CreateLambda(b);var g=this;return new c(function(){var h,i;return new f(function(){h=g.GetEnumerator();i=new n(b);c.From(e).ForEach(function(a){i.Add(a)})},function(){while(h.MoveNext()){var b=h.Current();if(!i.Contains(b)){i.Add(b);return this.Yield(b)}}return a},function(){d.Dispose(h)})})},Intersect:function(e,b){b=d.CreateLambda(b);var g=this;return new c(function(){var h,i,j;return new f(function(){h=g.GetEnumerator();i=new n(b);c.From(e).ForEach(function(a){i.Add(a)});j=new n(b)},function(){while(h.MoveNext()){var b=h.Current();if(!j.Contains(b)&&i.Contains(b)){j.Add(b);return this.Yield(b)}}return a},function(){d.Dispose(h)})})},SequenceEqual:function(h,f){f=d.CreateLambda(f);var g=this.GetEnumerator();try{var b=c.From(h).GetEnumerator();try{while(g.MoveNext())if(!b.MoveNext()||f(g.Current())!==f(b.Current()))return a;return b.MoveNext()?a:e}finally{d.Dispose(b)}}finally{d.Dispose(g)}},Union:function(e,b){b=d.CreateLambda(b);var g=this;return new c(function(){var j,h,i;return new f(function(){j=g.GetEnumerator();i=new n(b)},function(){var b;if(h===undefined){while(j.MoveNext()){b=j.Current();if(!i.Contains(b)){i.Add(b);return this.Yield(b)}}h=c.From(e).GetEnumerator()}while(h.MoveNext()){b=h.Current();if(!i.Contains(b)){i.Add(b);return this.Yield(b)}}return a},function(){try{d.Dispose(j)}finally{d.Dispose(h)}})})},OrderBy:function(b){return new j(this,b,a)},OrderByDescending:function(a){return new j(this,a,e)},Reverse:function(){var b=this;return new c(function(){var c,d;return new f(function(){c=b.ToArray();d=c.length},function(){return d>0?this.Yield(c[--d]):a},g.Blank)})},Shuffle:function(){var b=this;return new c(function(){var c;return new f(function(){c=b.ToArray()},function(){if(c.length>0){var b=Math.floor(Math.random()*c.length);return this.Yield(c.splice(b,1)[0])}return a},g.Blank)})},GroupBy:function(i,h,e,g){var j=this;i=d.CreateLambda(i);h=d.CreateLambda(h);if(e!=b)e=d.CreateLambda(e);g=d.CreateLambda(g);return new c(function(){var c;return new f(function(){c=j.ToLookup(i,h,g).ToEnumerable().GetEnumerator()},function(){while(c.MoveNext())return e==b?this.Yield(c.Current()):this.Yield(e(c.Current().Key(),c.Current()));return a},function(){d.Dispose(c)})})},PartitionBy:function(j,i,g,h){var l=this;j=d.CreateLambda(j);i=d.CreateLambda(i);h=d.CreateLambda(h);var k;if(g==b){k=a;g=function(b,a){return new o(b,a)}}else{k=e;g=d.CreateLambda(g)}return new c(function(){var b,n,o,m=[];return new f(function(){b=l.GetEnumerator();if(b.MoveNext()){n=j(b.Current());o=h(n);m.push(i(b.Current()))}},function(){var d;while((d=b.MoveNext())==e)if(o===h(j(b.Current())))m.push(i(b.Current()));else break;if(m.length>0){var f=k?g(n,c.From(m)):g(n,m);if(d){n=j(b.Current());o=h(n);m=[i(b.Current())]}else m=[];return this.Yield(f)}return a},function(){d.Dispose(b)})})},BufferWithCount:function(e){var b=this;return new c(function(){var c;return new f(function(){c=b.GetEnumerator()},function(){var b=[],d=0;while(c.MoveNext()){b.push(c.Current());if(++d>=e)return this.Yield(b)}return b.length>0?this.Yield(b):a},function(){d.Dispose(c)})})},Aggregate:function(c,b,a){return this.Scan(c,b,a).Last()},Average:function(a){a=d.CreateLambda(a);var c=0,b=0;this.ForEach(function(d){c+=a(d);++b});return c/b},Count:function(a){a=a==b?g.True:d.CreateLambda(a);var c=0;this.ForEach(function(d,b){if(a(d,b))++c});return c},Max:function(a){if(a==b)a=g.Identity;return this.Select(a).Aggregate(function(a,b){return a>b?a:b})},Min:function(a){if(a==b)a=g.Identity;return this.Select(a).Aggregate(function(a,b){return a<b?a:b})},MaxBy:function(a){a=d.CreateLambda(a);return this.Aggregate(function(b,c){return a(b)>a(c)?b:c})},MinBy:function(a){a=d.CreateLambda(a);return this.Aggregate(function(b,c){return a(b)<a(c)?b:c})},Sum:function(a){if(a==b)a=g.Identity;return this.Select(a).Aggregate(0,function(a,b){return a+b})},ElementAt:function(d){var c,b=a;this.ForEach(function(g,f){if(f==d){c=g;b=e;return a}});if(!b)throw new Error("index is less than 0 or greater than or equal to the number of elements in source.");return c},ElementAtOrDefault:function(f,d){var c,b=a;this.ForEach(function(g,d){if(d==f){c=g;b=e;return a}});return!b?d:c},First:function(c){if(c!=b)return this.Where(c).First();var f,d=a;this.ForEach(function(b){f=b;d=e;return a});if(!d)throw new Error("First:No element satisfies the condition.");return f},FirstOrDefault:function(c,d){if(d!=b)return this.Where(d).FirstOrDefault(c);var g,f=a;this.ForEach(function(b){g=b;f=e;return a});return!f?c:g},Last:function(c){if(c!=b)return this.Where(c).Last();var f,d=a;this.ForEach(function(a){d=e;f=a});if(!d)throw new Error("Last:No element satisfies the condition.");return f},LastOrDefault:function(c,d){if(d!=b)return this.Where(d).LastOrDefault(c);var g,f=a;this.ForEach(function(a){f=e;g=a});return!f?c:g},Single:function(d){if(d!=b)return this.Where(d).Single();var f,c=a;this.ForEach(function(a){if(!c){c=e;f=a}else throw new Error(m);});if(!c)throw new Error("Single:No element satisfies the condition.");return f},SingleOrDefault:function(d,f){if(f!=b)return this.Where(f).SingleOrDefault(d);var g,c=a;this.ForEach(function(a){if(!c){c=e;g=a}else throw new Error(m);});return!c?d:g},Skip:function(e){var b=this;return new c(function(){var c,g=0;return new f(function(){c=b.GetEnumerator();while(g++<e&&c.MoveNext());},function(){return c.MoveNext()?this.Yield(c.Current()):a},function(){d.Dispose(c)})})},SkipWhile:function(b){b=d.CreateLambda(b);var g=this;return new c(function(){var c,i=0,h=a;return new f(function(){c=g.GetEnumerator()},function(){while(!h)if(c.MoveNext()){if(!b(c.Current(),i++)){h=e;return this.Yield(c.Current())}continue}else return a;return c.MoveNext()?this.Yield(c.Current()):a},function(){d.Dispose(c)})})},Take:function(e){var b=this;return new c(function(){var c,g=0;return new f(function(){c=b.GetEnumerator()},function(){return g++<e&&c.MoveNext()?this.Yield(c.Current()):a},function(){d.Dispose(c)})})},TakeWhile:function(b){b=d.CreateLambda(b);var e=this;return new c(function(){var c,g=0;return new f(function(){c=e.GetEnumerator()},function(){return c.MoveNext()&&b(c.Current(),g++)?this.Yield(c.Current()):a},function(){d.Dispose(c)})})},TakeExceptLast:function(e){if(e==b)e=1;var g=this;return new c(function(){if(e<=0)return g.GetEnumerator();var b,c=[];return new f(function(){b=g.GetEnumerator()},function(){while(b.MoveNext()){if(c.length==e){c.push(b.Current());return this.Yield(c.shift())}c.push(b.Current())}return a},function(){d.Dispose(b)})})},TakeFromLast:function(e){if(e<=0||e==b)return c.Empty();var g=this;return new c(function(){var j,h,i=[];return new f(function(){j=g.GetEnumerator()},function(){while(j.MoveNext()){i.length==e&&i.shift();i.push(j.Current())}if(h==b)h=c.From(i).GetEnumerator();return h.MoveNext()?this.Yield(h.Current()):a},function(){d.Dispose(h)})})},IndexOf:function(c){var a=b;this.ForEach(function(d,b){if(d===c){a=b;return e}});return a!==b?a:-1},LastIndexOf:function(b){var a=-1;this.ForEach(function(d,c){if(d===b)a=c});return a},ToArray:function(){var a=[];this.ForEach(function(b){a.push(b)});return a},ToLookup:function(c,b,a){c=d.CreateLambda(c);b=d.CreateLambda(b);a=d.CreateLambda(a);var e=new n(a);this.ForEach(function(g){var f=c(g),a=b(g),d=e.Get(f);if(d!==undefined)d.push(a);else e.Add(f,[a])});return new q(e)},ToObject:function(b,a){b=d.CreateLambda(b);a=d.CreateLambda(a);var c={};this.ForEach(function(d){c[b(d)]=a(d)});return c},ToDictionary:function(c,b,a){c=d.CreateLambda(c);b=d.CreateLambda(b);a=d.CreateLambda(a);var e=new n(a);this.ForEach(function(a){e.Add(c(a),b(a))});return e},ToJSON:function(a,b){return JSON.stringify(this.ToArray(),a,b)},ToString:function(a,c){if(a==b)a="";if(c==b)c=g.Identity;return this.Select(c).ToArray().join(a)},Do:function(b){var e=this;b=d.CreateLambda(b);return new c(function(){var c,g=0;return new f(function(){c=e.GetEnumerator()},function(){if(c.MoveNext()){b(c.Current(),g++);return this.Yield(c.Current())}return a},function(){d.Dispose(c)})})},ForEach:function(c){c=d.CreateLambda(c);var e=0,b=this.GetEnumerator();try{while(b.MoveNext())if(c(b.Current(),e++)===a)break}finally{d.Dispose(b)}},Write:function(c,f){if(c==b)c="";f=d.CreateLambda(f);var g=e;this.ForEach(function(b){if(g)g=a;else document.write(c);document.write(f(b))})},WriteLine:function(a){a=d.CreateLambda(a);this.ForEach(function(b){document.write(a(b));document.write("<br />")})},Force:function(){var a=this.GetEnumerator();try{while(a.MoveNext());}finally{d.Dispose(a)}},Let:function(b){b=d.CreateLambda(b);var e=this;return new c(function(){var g;return new f(function(){g=c.From(b(e)).GetEnumerator()},function(){return g.MoveNext()?this.Yield(g.Current()):a},function(){d.Dispose(g)})})},Share:function(){var e=this,d;return new c(function(){return new f(function(){if(d==b)d=e.GetEnumerator()},function(){return d.MoveNext()?this.Yield(d.Current()):a},g.Blank)})},MemoizeAll:function(){var h=this,e,d;return new c(function(){var c=-1;return new f(function(){if(d==b){d=h.GetEnumerator();e=[]}},function(){c++;return e.length<=c?d.MoveNext()?this.Yield(e[c]=d.Current()):a:this.Yield(e[c])},g.Blank)})},Catch:function(b){b=d.CreateLambda(b);var e=this;return new c(function(){var c;return new f(function(){c=e.GetEnumerator()},function(){try{return c.MoveNext()?this.Yield(c.Current()):a}catch(d){b(d);return a}},function(){d.Dispose(c)})})},Finally:function(b){b=d.CreateLambda(b);var e=this;return new c(function(){var c;return new f(function(){c=e.GetEnumerator()},function(){return c.MoveNext()?this.Yield(c.Current()):a},function(){try{d.Dispose(c)}finally{b()}})})},Trace:function(c,a){if(c==b)c="Trace";a=d.CreateLambda(a);return this.Do(function(b){console.log(c,":",a(b))})}};var g={Identity:function(a){return a},True:function(){return e},Blank:function(){}},i={Boolean:typeof e,Number:typeof 0,String:typeof"",Object:typeof{},Undefined:typeof undefined,Function:typeof function(){}},d={CreateLambda:function(a){if(a==b)return g.Identity;if(typeof a==i.String)if(a=="")return g.Identity;else if(a.indexOf("=>")==-1)return new Function("$,$$,$$$,$$$$","return "+a);else{var c=a.match(/^[(\s]*([^()]*?)[)\s]*=>(.*)/);return new Function(c[1],"return "+c[2])}return a},IsIEnumerable:function(b){if(typeof Enumerator!=i.Undefined)try{new Enumerator(b);return e}catch(c){}return a},Compare:function(a,b){return a===b?0:a>b?1:-1},Dispose:function(a){a!=b&&a.Dispose()}},k={Before:0,Running:1,After:2},f=function(d,f,g){var c=new p,b=k.Before;this.Current=c.Current;this.MoveNext=function(){try{switch(b){case k.Before:b=k.Running;d();case k.Running:if(f.apply(c))return e;else{this.Dispose();return a}case k.After:return a}}catch(g){this.Dispose();throw g;}};this.Dispose=function(){if(b!=k.Running)return;try{g()}finally{b=k.After}}},p=function(){var a=b;this.Current=function(){return a};this.Yield=function(b){a=b;return e}},j=function(f,b,c,e){var a=this;a.source=f;a.keySelector=d.CreateLambda(b);a.descending=c;a.parent=e};j.prototype=new c;j.prototype.CreateOrderedEnumerable=function(a,b){return new j(this.source,a,b,this)};j.prototype.ThenBy=function(b){return this.CreateOrderedEnumerable(b,a)};j.prototype.ThenByDescending=function(a){return this.CreateOrderedEnumerable(a,e)};j.prototype.GetEnumerator=function(){var h=this,d,c,e=0;return new f(function(){d=[];c=[];h.source.ForEach(function(b,a){d.push(b);c.push(a)});var a=l.Create(h,b);a.GenerateKeys(d);c.sort(function(b,c){return a.Compare(b,c)})},function(){return e<c.length?this.Yield(d[c[e++]]):a},g.Blank)};var l=function(c,d,e){var a=this;a.keySelector=c;a.descending=d;a.child=e;a.keys=b};l.Create=function(a,d){var c=new l(a.keySelector,a.descending,d);return a.parent!=b?l.Create(a.parent,c):c};l.prototype.GenerateKeys=function(d){var a=this;for(var f=d.length,g=a.keySelector,e=new Array(f),c=0;c<f;c++)e[c]=g(d[c]);a.keys=e;a.child!=b&&a.child.GenerateKeys(d)};l.prototype.Compare=function(e,f){var a=this,c=d.Compare(a.keys[e],a.keys[f]);if(c==0){if(a.child!=b)return a.child.Compare(e,f);c=d.Compare(e,f)}return a.descending?-c:c};var h=function(a){this.source=a};h.prototype=new c;h.prototype.Any=function(a){return a==b?this.source.length>0:c.prototype.Any.apply(this,arguments)};h.prototype.Count=function(a){return a==b?this.source.length:c.prototype.Count.apply(this,arguments)};h.prototype.ElementAt=function(a){return 0<=a&&a<this.source.length?this.source[a]:c.prototype.ElementAt.apply(this,arguments)};h.prototype.ElementAtOrDefault=function(a,b){return 0<=a&&a<this.source.length?this.source[a]:b};h.prototype.First=function(a){return a==b&&this.source.length>0?this.source[0]:c.prototype.First.apply(this,arguments)};h.prototype.FirstOrDefault=function(a,d){return d!=b?c.prototype.FirstOrDefault.apply(this,arguments):this.source.length>0?this.source[0]:a};h.prototype.Last=function(d){var a=this;return d==b&&a.source.length>0?a.source[a.source.length-1]:c.prototype.Last.apply(a,arguments)};h.prototype.LastOrDefault=function(d,e){var a=this;return e!=b?c.prototype.LastOrDefault.apply(a,arguments):a.source.length>0?a.source[a.source.length-1]:d};h.prototype.Skip=function(d){var b=this.source;return new c(function(){var c;return new f(function(){c=d<0?0:d},function(){return c<b.length?this.Yield(b[c++]):a},g.Blank)})};h.prototype.TakeExceptLast=function(a){if(a==b)a=1;return this.Take(this.source.length-a)};h.prototype.TakeFromLast=function(a){return this.Skip(this.source.length-a)};h.prototype.Reverse=function(){var b=this.source;return new c(function(){var c;return new f(function(){c=b.length},function(){return c>0?this.Yield(b[--c]):a},g.Blank)})};h.prototype.SequenceEqual=function(d,e){return(d instanceof h||d instanceof Array)&&e==b&&c.From(d).Count()!=this.Count()?a:c.prototype.SequenceEqual.apply(this,arguments)};h.prototype.ToString=function(a,d){if(d!=b||!(this.source instanceof Array))return c.prototype.ToString.apply(this,arguments);if(a==b)a="";return this.source.join(a)};h.prototype.GetEnumerator=function(){var b=this.source,c=0;return new f(g.Blank,function(){return c<b.length?this.Yield(b[c++]):a},g.Blank)};var n=function(){var h=function(a,b){return Object.prototype.hasOwnProperty.call(a,b)},d=function(a){return a===b?"null":a===undefined?"undefined":typeof a.toString===i.Function?a.toString():Object.prototype.toString.call(a)},l=function(d,c){var a=this;a.Key=d;a.Value=c;a.Prev=b;a.Next=b},j=function(){this.First=b;this.Last=b};j.prototype={AddLast:function(c){var a=this;if(a.Last!=b){a.Last.Next=c;c.Prev=a.Last;a.Last=c}else a.First=a.Last=c},Replace:function(c,a){if(c.Prev!=b){c.Prev.Next=a;a.Prev=c.Prev}else this.First=a;if(c.Next!=b){c.Next.Prev=a;a.Next=c.Next}else this.Last=a},Remove:function(a){if(a.Prev!=b)a.Prev.Next=a.Next;else this.First=a.Next;if(a.Next!=b)a.Next.Prev=a.Prev;else this.Last=a.Prev}};var k=function(c){var a=this;a.count=0;a.entryList=new j;a.buckets={};a.compareSelector=c==b?g.Identity:c};k.prototype={Add:function(i,j){var a=this,g=a.compareSelector(i),f=d(g),c=new l(i,j);if(h(a.buckets,f)){for(var b=a.buckets[f],e=0;e<b.length;e++)if(a.compareSelector(b[e].Key)===g){a.entryList.Replace(b[e],c);b[e]=c;return}b.push(c)}else a.buckets[f]=[c];a.count++;a.entryList.AddLast(c)},Get:function(i){var a=this,c=a.compareSelector(i),g=d(c);if(!h(a.buckets,g))return undefined;for(var e=a.buckets[g],b=0;b<e.length;b++){var f=e[b];if(a.compareSelector(f.Key)===c)return f.Value}return undefined},Set:function(k,m){var b=this,g=b.compareSelector(k),j=d(g);if(h(b.buckets,j))for(var f=b.buckets[j],c=0;c<f.length;c++)if(b.compareSelector(f[c].Key)===g){var i=new l(k,m);b.entryList.Replace(f[c],i);f[c]=i;return e}return a},Contains:function(j){var b=this,f=b.compareSelector(j),i=d(f);if(!h(b.buckets,i))return a;for(var g=b.buckets[i],c=0;c<g.length;c++)if(b.compareSelector(g[c].Key)===f)return e;return a},Clear:function(){this.count=0;this.buckets={};this.entryList=new j},Remove:function(g){var a=this,f=a.compareSelector(g),e=d(f);if(!h(a.buckets,e))return;for(var b=a.buckets[e],c=0;c<b.length;c++)if(a.compareSelector(b[c].Key)===f){a.entryList.Remove(b[c]);b.splice(c,1);if(b.length==0)delete a.buckets[e];a.count--;return}},Count:function(){return this.count},ToEnumerable:function(){var d=this;return new c(function(){var c;return new f(function(){c=d.entryList.First},function(){if(c!=b){var d={Key:c.Key,Value:c.Value};c=c.Next;return this.Yield(d)}return a},g.Blank)})}};return k}(),q=function(a){var b=this;b.Count=function(){return a.Count()};b.Get=function(b){return c.From(a.Get(b))};b.Contains=function(b){return a.Contains(b)};b.ToEnumerable=function(){return a.ToEnumerable().Select(function(a){return new o(a.Key,a.Value)})}},o=function(b,a){this.Key=function(){return b};h.call(this,a)};o.prototype=new h;return c}();
// ems2node 
if (typeof define !== 'function' && module && module.require && module.exports) {
    var define = require('./ems2node').define(module);
}
//兼容AMD模块
if(typeof define === 'function' && define.amd) {
	define('Enumerable', [], function() {
			return Enumerable;
	});
}