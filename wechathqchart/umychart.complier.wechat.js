/*
    通达信编译器
*/

import { JSCommonData } from "umychart.data.wechat.js";     //行情数据结构体 及涉及到的行情算法(复权,周期等)  

var g_JSComplierResource=
{
    Domain : "https://opensource.zealink.com",               //API域名
    CacheDomain : "https://opensourcecache.zealink.com"      //缓存域名
}

var Messages = {
    BadGetterArity: 'Getter must not have any formal parameters',
    BadSetterArity: 'Setter must have exactly one formal parameter',
    BadSetterRestParameter: 'Setter function argument must not be a rest parameter',
    ConstructorIsAsync: 'Class constructor may not be an async method',
    ConstructorSpecialMethod: 'Class constructor may not be an accessor',
    DeclarationMissingInitializer: 'Missing initializer in %0 declaration',
    DefaultRestParameter: 'Unexpected token =',
    DuplicateBinding: 'Duplicate binding %0',
    DuplicateConstructor: 'A class may only have one constructor',
    DuplicateProtoProperty: 'Duplicate __proto__ fields are not allowed in object literals',
    ForInOfLoopInitializer: '%0 loop variable declaration may not have an initializer',
    GeneratorInLegacyContext: 'Generator declarations are not allowed in legacy contexts',
    IllegalBreak: 'Illegal break statement',
    IllegalContinue: 'Illegal continue statement',
    IllegalExportDeclaration: 'Unexpected token',
    IllegalImportDeclaration: 'Unexpected token',
    IllegalLanguageModeDirective: 'Illegal \'use strict\' directive in function with non-simple parameter list',
    IllegalReturn: 'Illegal return statement',
    InvalidEscapedReservedWord: 'Keyword must not contain escaped characters',
    InvalidHexEscapeSequence: 'Invalid hexadecimal escape sequence',
    InvalidLHSInAssignment: 'Invalid left-hand side in assignment',
    InvalidLHSInForIn: 'Invalid left-hand side in for-in',
    InvalidLHSInForLoop: 'Invalid left-hand side in for-loop',
    InvalidModuleSpecifier: 'Unexpected token',
    InvalidRegExp: 'Invalid regular expression',
    LetInLexicalBinding: 'let is disallowed as a lexically bound name',
    MissingFromClause: 'Unexpected token',
    MultipleDefaultsInSwitch: 'More than one default clause in switch statement',
    NewlineAfterThrow: 'Illegal newline after throw',
    NoAsAfterImportNamespace: 'Unexpected token',
    NoCatchOrFinally: 'Missing catch or finally after try',
    ParameterAfterRestParameter: 'Rest parameter must be last formal parameter',
    Redeclaration: '%0 \'%1\' has already been declared',
    StaticPrototype: 'Classes may not have static property named prototype',
    StrictCatchVariable: 'Catch variable may not be eval or arguments in strict mode',
    StrictDelete: 'Delete of an unqualified identifier in strict mode.',
    StrictFunction: 'In strict mode code, functions can only be declared at top level or inside a block',
    StrictFunctionName: 'Function name may not be eval or arguments in strict mode',
    StrictLHSAssignment: 'Assignment to eval or arguments is not allowed in strict mode',
    StrictLHSPostfix: 'Postfix increment/decrement may not have eval or arguments operand in strict mode',
    StrictLHSPrefix: 'Prefix increment/decrement may not have eval or arguments operand in strict mode',
    StrictModeWith: 'Strict mode code may not include a with statement',
    StrictOctalLiteral: 'Octal literals are not allowed in strict mode.',
    StrictParamDupe: 'Strict mode function may not have duplicate parameter names',
    StrictParamName: 'Parameter name eval or arguments is not allowed in strict mode',
    StrictReservedWord: 'Use of future reserved word in strict mode',
    StrictVarName: 'Variable name may not be eval or arguments in strict mode',
    TemplateOctalLiteral: 'Octal literals are not allowed in template strings.',
    UnexpectedEOS: 'Unexpected end of input',
    UnexpectedIdentifier: 'Unexpected identifier',
    UnexpectedNumber: 'Unexpected number',
    UnexpectedReserved: 'Unexpected reserved word',
    UnexpectedString: 'Unexpected string',
    UnexpectedTemplate: 'Unexpected quasi %0',
    UnexpectedToken: 'Unexpected token %0',
    UnexpectedTokenIllegal: 'Unexpected token ILLEGAL',
    UnknownLabel: 'Undefined label \'%0\'',
    UnterminatedRegExp: 'Invalid regular expression: missing /'
};

var Regex = {
    // Unicode v8.0.0 NonAsciiIdentifierStart:
    NonAsciiIdentifierStart: /[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0-\u08B4\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2118-\u211D\u2124\u2126\u2128\u212A-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309B-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AD\uA7B0-\uA7B7\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF30-\uDF4A\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2]|\uD804[\uDC03-\uDC37\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61]|\uD805[\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDF00-\uDF19]|\uD806[\uDCA0-\uDCDF\uDCFF\uDEC0-\uDEF8]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50\uDF93-\uDF9F]|\uD82C[\uDC00\uDC01]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB]|\uD83A[\uDC00-\uDCC4]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1]|\uD87E[\uDC00-\uDE1D]/,
    // Unicode v8.0.0 NonAsciiIdentifierPart:
    NonAsciiIdentifierPart: /[\xAA\xB5\xB7\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0300-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u0483-\u0487\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u05D0-\u05EA\u05F0-\u05F2\u0610-\u061A\u0620-\u0669\u066E-\u06D3\u06D5-\u06DC\u06DF-\u06E8\u06EA-\u06FC\u06FF\u0710-\u074A\u074D-\u07B1\u07C0-\u07F5\u07FA\u0800-\u082D\u0840-\u085B\u08A0-\u08B4\u08E3-\u0963\u0966-\u096F\u0971-\u0983\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BC-\u09C4\u09C7\u09C8\u09CB-\u09CE\u09D7\u09DC\u09DD\u09DF-\u09E3\u09E6-\u09F1\u0A01-\u0A03\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A59-\u0A5C\u0A5E\u0A66-\u0A75\u0A81-\u0A83\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABC-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AD0\u0AE0-\u0AE3\u0AE6-\u0AEF\u0AF9\u0B01-\u0B03\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3C-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B5C\u0B5D\u0B5F-\u0B63\u0B66-\u0B6F\u0B71\u0B82\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD0\u0BD7\u0BE6-\u0BEF\u0C00-\u0C03\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C58-\u0C5A\u0C60-\u0C63\u0C66-\u0C6F\u0C81-\u0C83\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBC-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CDE\u0CE0-\u0CE3\u0CE6-\u0CEF\u0CF1\u0CF2\u0D01-\u0D03\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D-\u0D44\u0D46-\u0D48\u0D4A-\u0D4E\u0D57\u0D5F-\u0D63\u0D66-\u0D6F\u0D7A-\u0D7F\u0D82\u0D83\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2\u0DF3\u0E01-\u0E3A\u0E40-\u0E4E\u0E50-\u0E59\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB9\u0EBB-\u0EBD\u0EC0-\u0EC4\u0EC6\u0EC8-\u0ECD\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E-\u0F47\u0F49-\u0F6C\u0F71-\u0F84\u0F86-\u0F97\u0F99-\u0FBC\u0FC6\u1000-\u1049\u1050-\u109D\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u135D-\u135F\u1369-\u1371\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1714\u1720-\u1734\u1740-\u1753\u1760-\u176C\u176E-\u1770\u1772\u1773\u1780-\u17D3\u17D7\u17DC\u17DD\u17E0-\u17E9\u180B-\u180D\u1810-\u1819\u1820-\u1877\u1880-\u18AA\u18B0-\u18F5\u1900-\u191E\u1920-\u192B\u1930-\u193B\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19DA\u1A00-\u1A1B\u1A20-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AA7\u1AB0-\u1ABD\u1B00-\u1B4B\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1BF3\u1C00-\u1C37\u1C40-\u1C49\u1C4D-\u1C7D\u1CD0-\u1CD2\u1CD4-\u1CF6\u1CF8\u1CF9\u1D00-\u1DF5\u1DFC-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u200C\u200D\u203F\u2040\u2054\u2071\u207F\u2090-\u209C\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2102\u2107\u210A-\u2113\u2115\u2118-\u211D\u2124\u2126\u2128\u212A-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D7F-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2DE0-\u2DFF\u3005-\u3007\u3021-\u302F\u3031-\u3035\u3038-\u303C\u3041-\u3096\u3099-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA62B\uA640-\uA66F\uA674-\uA67D\uA67F-\uA6F1\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AD\uA7B0-\uA7B7\uA7F7-\uA827\uA840-\uA873\uA880-\uA8C4\uA8D0-\uA8D9\uA8E0-\uA8F7\uA8FB\uA8FD\uA900-\uA92D\uA930-\uA953\uA960-\uA97C\uA980-\uA9C0\uA9CF-\uA9D9\uA9E0-\uA9FE\uAA00-\uAA36\uAA40-\uAA4D\uAA50-\uAA59\uAA60-\uAA76\uAA7A-\uAAC2\uAADB-\uAADD\uAAE0-\uAAEF\uAAF2-\uAAF6\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABEA\uABEC\uABED\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE00-\uFE0F\uFE20-\uFE2F\uFE33\uFE34\uFE4D-\uFE4F\uFE70-\uFE74\uFE76-\uFEFC\uFF10-\uFF19\uFF21-\uFF3A\uFF3F\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDDFD\uDE80-\uDE9C\uDEA0-\uDED0\uDEE0\uDF00-\uDF1F\uDF30-\uDF4A\uDF50-\uDF7A\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCA0-\uDCA9\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00-\uDE03\uDE05\uDE06\uDE0C-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE38-\uDE3A\uDE3F\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE6\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2]|\uD804[\uDC00-\uDC46\uDC66-\uDC6F\uDC7F-\uDCBA\uDCD0-\uDCE8\uDCF0-\uDCF9\uDD00-\uDD34\uDD36-\uDD3F\uDD50-\uDD73\uDD76\uDD80-\uDDC4\uDDCA-\uDDCC\uDDD0-\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE37\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEEA\uDEF0-\uDEF9\uDF00-\uDF03\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3C-\uDF44\uDF47\uDF48\uDF4B-\uDF4D\uDF50\uDF57\uDF5D-\uDF63\uDF66-\uDF6C\uDF70-\uDF74]|\uD805[\uDC80-\uDCC5\uDCC7\uDCD0-\uDCD9\uDD80-\uDDB5\uDDB8-\uDDC0\uDDD8-\uDDDD\uDE00-\uDE40\uDE44\uDE50-\uDE59\uDE80-\uDEB7\uDEC0-\uDEC9\uDF00-\uDF19\uDF1D-\uDF2B\uDF30-\uDF39]|\uD806[\uDCA0-\uDCE9\uDCFF\uDEC0-\uDEF8]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE60-\uDE69\uDED0-\uDEED\uDEF0-\uDEF4\uDF00-\uDF36\uDF40-\uDF43\uDF50-\uDF59\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50-\uDF7E\uDF8F-\uDF9F]|\uD82C[\uDC00\uDC01]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99\uDC9D\uDC9E]|\uD834[\uDD65-\uDD69\uDD6D-\uDD72\uDD7B-\uDD82\uDD85-\uDD8B\uDDAA-\uDDAD\uDE42-\uDE44]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB\uDFCE-\uDFFF]|\uD836[\uDE00-\uDE36\uDE3B-\uDE6C\uDE75\uDE84\uDE9B-\uDE9F\uDEA1-\uDEAF]|\uD83A[\uDC00-\uDCC4\uDCD0-\uDCD6]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1]|\uD87E[\uDC00-\uDE1D]|\uDB40[\uDD00-\uDDEF]/
}

var Character =
{
    FromCodePoint: function (cp) {
        return (cp < 0x10000) ? String.fromCharCode(cp) :
            String.fromCharCode(0xD800 + ((cp - 0x10000) >> 10)) +
                String.fromCharCode(0xDC00 + ((cp - 0x10000) & 1023));
    },

    //是否是空格 https://tc39.github.io/ecma262/#sec-white-space
    IsWhiteSpace:function(cp)
    {
        return (cp === 0x20) || (cp === 0x09) || (cp === 0x0B) || (cp === 0x0C) || (cp === 0xA0) ||
            (cp >= 0x1680 && [0x1680, 0x2000, 0x2001, 0x2002, 0x2003, 0x2004, 0x2005, 0x2006, 0x2007, 0x2008, 0x2009, 0x200A, 0x202F, 0x205F, 0x3000, 0xFEFF].indexOf(cp) >= 0);
    },

    //是否换行 https://tc39.github.io/ecma262/#sec-line-terminators
    IsLineTerminator:function(cp)
    {
        return (cp === 0x0A) || (cp === 0x0D) || (cp === 0x2028) || (cp === 0x2029);
    },

    // https://tc39.github.io/ecma262/#sec-names-and-keywords
    IsIdentifierStart:function(cp)
    {
        return (cp === 0x24) || (cp === 0x5F) ||
            (cp >= 0x41 && cp <= 0x5A) ||
            (cp >= 0x61 && cp <= 0x7A) ||
            (cp === 0x5C) ||
            ((cp >= 0x80) && Regex.NonAsciiIdentifierStart.test(Character.FromCodePoint(cp)));
    },

    IsIdentifierPart: function (cp) 
    {
        return (cp === 0x24) || (cp === 0x5F) ||
            (cp >= 0x41 && cp <= 0x5A) ||
            (cp >= 0x61 && cp <= 0x7A) ||
            (cp >= 0x30 && cp <= 0x39) ||
            (cp === 0x5C) ||
            ((cp >= 0x80) && Regex.NonAsciiIdentifierPart.test(Character.FromCodePoint(cp)));
    },

    // https://tc39.github.io/ecma262/#sec-literals-numeric-literals
    IsDecimalDigit: function (cp) 
    {
        return (cp >= 0x30 && cp <= 0x39); // 0..9
    },

    IsHexDigit: function (cp) 
    {
        return (cp >= 0x30 && cp <= 0x39) || (cp >= 0x41 && cp <= 0x46) || (cp >= 0x61 && cp <= 0x66); // a..f
    },

    isOctalDigit: function (cp) 
    {
        return (cp >= 0x30 && cp <= 0x37); // 0..7
    }
}

var TOKEN_NAME={};
TOKEN_NAME[1 /* BooleanLiteral */] = 'Boolean';
TOKEN_NAME[2 /* EOF */] = '<end>';
TOKEN_NAME[3 /* Identifier */] = 'Identifier';
TOKEN_NAME[4 /* Keyword */] = 'Keyword';
TOKEN_NAME[5 /* NullLiteral */] = 'Null';
TOKEN_NAME[6 /* NumericLiteral */] = 'Numeric';
TOKEN_NAME[7 /* Punctuator */] = 'Punctuator';
TOKEN_NAME[8 /* StringLiteral */] = 'String';
TOKEN_NAME[9 /* RegularExpression */] = 'RegularExpression';
TOKEN_NAME[10 /* Template */] = 'Template';

//编译异常, 错误类
function ErrorHandler()
{
    this.Error=[];

    this.RecordError=function(error)
    {
        this.Error.push(error);
    }

    this.ConstructError=function(msg,column)
    {
        let error=new Error(msg);
        //通过自己抛异常并自己截获 来获取调用堆栈信息
        try
        {
            throw error;
        }
        catch(base)
        {
            if (Object.create && Object.defineProperties)
            {
                error=Object.create(base);
                error.Column=column;
            }
        }

        return error;
    }

    this.CreateError=function(index, line, col, description)
    {
        let msg='Line ' + line + ': ' + description;
        let error=this.ConstructError(msg,col);
        error.Index=index;
        error.LineNumber=line;
        error.Description=description;
        return error;
    }

    this.ThrowError=function(index, line, col, description)
    {
        let error=this.CreateError(index,line,col,description);
        throw error;
    }
}

//扫描类
function Scanner(code, ErrorHandler)
{
    this.Source=code;
    this.ErrorHandler=ErrorHandler;
    this.Length=code.length;
    this.Index=0;
    this.LineNumber=(code.length>0)?1:0;
    this.LineStart=0;
    this.CurlyStack=[];

    this.SaveState=function()   //保存当前扫描状态
    {
        return { Index:this.Index, LineNumber:this.LineNumber, LineStart:this.LineStart };
    }

    this.RestoreState=function(state)   //还原扫描状态
    {
        this.Index=state.Index;
        this.LineNumber=state.LineNumber;
        this.LineStart=state.LineStart;
    }

    this.IsEOF=function()     //否是已经结束
    {
        return this.Index>=this.Length;
    }

    this.IsKeyword=function(id)
    {
        return false;
    }

    this.CodePointAt = function (i) 
    {
        let cp = this.Source.charCodeAt(i);
        if (cp >= 0xD800 && cp <= 0xDBFF) 
        {
            let second = this.Source.charCodeAt(i + 1);
            if (second >= 0xDC00 && second <= 0xDFFF) {
                var first = cp;
                cp = (first - 0xD800) * 0x400 + second - 0xDC00 + 0x10000;
            }
        }
        return cp;
    }

    this.Lex=function()
    {
        if (this.IsEOF()) return { Type:2/*EOF*/, Value:'', LineNumber:this.LineNumber, LineStart:this.LineStart, Start:this.Index, End:this.Index };
        let cp=this.Source.charCodeAt(this.Index);

        //变量名 或 关键字
        if (Character.IsIdentifierStart(cp)) return this.ScanIdentifier();

        //( ) ; 开头 操作符扫描
        if (cp === 0x28 || cp === 0x29 || cp === 0x3B) return this.ScanPunctuator();

        //' " 开头 字符串扫描
        if (cp === 0x27 || cp === 0x22) return this.ScanStringLiteral();

        //. 开头 浮点型
        if (cp==0x2E)
        {
            if (Character.IsDecimalDigit(this.Source.charCodeAt(this.Index + 1))) 
                return this.ScanNumericLiteral();

            return this.ScanPunctuator();
        }

        //数字
        if (Character.IsDecimalDigit(cp))  return this.ScanNumericLiteral();
        
        if (cp >= 0xD800 && cp < 0xDFFF)
        {
            if (Character.IsIdentifierStart(this.CodePointAt(this.Index))) return this.ScanIdentifier();
        }

        return this.ScanPunctuator();

    }

    //关键字 变量名 https://tc39.github.io/ecma262/#sec-names-and-keywords
    this.ScanIdentifier=function()
    {
        let type;
        let start=this.Index;
        //0x5C 反斜杠
        let id=(this.Source.charCodeAt(start)=== 0x5C) ? this.GetComplexIdentifier() : this.GetIdentifier();

        if (id.length) type=3;                      //Identifier
        else if (this.IsKeyword(id)) type=4;        //Keyword
        else if (id==null) type=5;                  //NullLiteral
        else if (id=='true' || id=='false') type=1; //BooleanLiteral
        else type=3;                                //Identifier

        if (type!=3  && (start+id.length!=this.Index))
        {
            let restore=this.Index;
            this.Index=start;
            throw Messages.InvalidEscapedReservedWord;
            this.Index=restore;
        }

        if (id=='AND' || id=='OR') type=7 /*Punctuator*/;

        return { Type:type, Value:id, LineNumber:this.LineNumber, LineStart:this.LineStart, Start:start, End:this.Index};
    }

    this.GetIdentifier=function()
    {
        let start=this.Index++; //start 保存进来的位置
        while(!this.IsEOF())
        {
            let ch=this.Source.charCodeAt(this.Index);
            if (ch==0x5C) 
            {
                this.Index=start;
                return this.GetComplexIdentifier();
            }
            else if (ch >= 0xD800 && ch < 0xDFFF)
            {
                this.Index=start;
                return this.GetComplexIdentifier();
            }

            if (Character.IsIdentifierPart(ch)) ++this.Index;
            else break;
        }

        return this.Source.slice(start,this.Index);
    }

    //操作符 https://tc39.github.io/ecma262/#sec-punctuators
    this.ScanPunctuator=function()
    {
        let start=this.Index;
        let str=this.Source[this.Index];
        switch(str)
        {
            case '(':
                ++this.Index;
                break;
            case ')':
            case ';':
            case ',':
                ++this.Index;
                break;
            default:
                str=this.Source.substr(this.Index,3);
                if (str=='AND') 
                {
                    this.Index+=3;
                }
                else
                {
                    str = this.Source.substr(this.Index, 2);
                    if (str === '&&' || str === '||' || str === '==' || str === '!=' || str === '<=' || str === '>=' || str === '=>' || str==':=' || str=='OR')
                    {
                        this.Index += 2;
                    }
                    else 
                    {
                        str=this.Source[this.Index];
                        if ('<>=!+-*%&|^/:'.indexOf(str) >= 0) ++this.Index;
                    }
                }
        }

        if (this.Index==start) 
           this.ThrowUnecpectedToken();

        return { Type:7/*Punctuator*/, Value:str, LineNumber:this.LineNumber, LineStart:this.LineStart, Start:start, End:this.Index };
    }

    //字符串 https://tc39.github.io/ecma262/#sec-literals-string-literals
    this.ScanStringLiteral=function()
    {
        let start=this.Index;
        let quote=this.Source[this.Index];

        ++this.Index;
        var octal=false;
        let str='';
        while(!this.IsEOF())
        {
            let ch=this.Source[this.Index++];
            if (ch==quote) 
            {
                quote='';
                break;
            }
            else if (ch=='\\')  //字符串转义
            {
                throw "not complete";
            }
            else if (Character.IsLineTerminator(ch.charCodeAt(0))) 
            {
                break;
            }
            else
            {
                str+=ch;
            }
        }

        if (quote!='')
        {
            this.Index=start;
            this.ThrowUnecpectedToken();
        }

        return {Type:8/*StringLiteral*/, Value:str, LineNumber:this.LineNumber, LineStart:this.LineStart, Start:start, End:this.Index};
    }

    this.ScanNumericLiteral=function()
    {
        let start=this.Index;
        let ch=this.Source[this.Index];
        let num='';
        if (ch!='.')
        {
            num=this.Source[this.Index++];
            ch=this.Source[this.Index];
            // Hex number starts with '0x'. 16进制
            if (num=='0')
            {
                if (ch=='x' || ch=='X')
                {
                    ++this.Index;
                    return this.ScanHexLiteral(start);
                }
            }

            while(Character.IsDecimalDigit(this.Source.charCodeAt(this.Index)))
            {
                num+=this.Source[this.Index++];
            }
            
            ch=this.Source[this.Index];
        }

        if (ch=='.')
        {
            num+=this.Source[this.Index++];
            while(Character.IsDecimalDigit(this.Source.charCodeAt(this.Index)))
            {
                num+=this.Source[this.Index++];
            }
            ch=this.Source[this.Index];
        }

        //科学计数法
        if (ch=='e' || ch=='E')
        {
            num+=this.Source[this.Index++];
            ch=this.Source[this.Index];
            if (ch=='+' || ch=='-') num+=this.Source[this.Index];
            if (Character.IsDecimalDigit(this.Source.charCodeAt(this.Index)))
            {
                while(Character.IsDecimalDigit(this.Source.charCodeAt(this.Index)))
                {
                    num+=this.Source[this.Index++];
                }
            }
            else
            {
                this.ThrowUnecpectedToken();
            }
        }

        if (Character.IsIdentifierStart(this.Source.charCodeAt(this.Index)))
        {
            this.ThrowUnecpectedToken();
        }

        return { Type:6/*NumericLiteral*/, Value:parseFloat(num), LineNumber:this.LineNumber, LineStart:this.LineStart, Start:start, End:this.Index };
    }

    //空格 或 注释
    this.ScanComments=function()
    {
        let comments;
        let start=(this.Index==0);
        while(!this.IsEOF())
        {
            let ch=this.Source.charCodeAt(this.Index);
            if (Character.IsWhiteSpace(ch)) //过滤掉空格
            {
                ++this.Index;
            }
            else if (Character.IsLineTerminator(ch))
            {
                ++this.Index;
                if (ch==0x0D && this.Source.charCodeAt(this.Index)==0x0A) ++this.Index; //回车+换行
                ++this.LineNumber;
                this.LineStart=this.Index;
                start=true;
            }
            else if (ch==0x2F)      // //注释
            {
                ch=this.Source.charCodeAt(this.Index+1);
                if (ch==0x2F)
                {
                    this.Index+=2;
                    let comment=this.SkipSingleLineComment(2);
                    start=true;
                }
                else
                {
                    break;
                }
                
            }
            else 
            {
                break;
            }
        }

        return comments;
    }

    //单行注释 https://tc39.github.io/ecma262/#sec-comments
    this.SkipSingleLineComment=function(offset)
    {
        let comments=[];
        while(!this.IsEOF())
        {
            let ch=this.Source.charCodeAt(this.Index);
            ++this.Index;
            if (Character.IsLineTerminator(ch))
            {
                if (ch === 13 && this.Source.charCodeAt(this.Index) === 10) 
                    ++this.Index;

                ++this.LineNumber;
                this.LineStart=this.Index;
                return comments;
            }
        }

        return comments;
    }

    this.ThrowUnecpectedToken=function(message)
    {
        if (!message) message = Messages.UnexpectedTokenIllegal;
	    return this.ErrorHandler.ThrowError(this.Index, this.LineNumber, this.Index - this.LineStart + 1, message);
    }

}

function Tokenizer(code)
{
    this.ErrorHandler=new ErrorHandler();   //错误信息处理类
    this.Scanner=new Scanner(code,this.ErrorHandler);
    this.Buffer=[];

    this.GetNextToken=function()
    {
        if (this.Buffer.length==0)
        {
            let comments=this.Scanner.ScanComments();
            if (!this.Scanner.IsEOF())
            {
                let token=this.Scanner.Lex();

                let entry={ Type:TOKEN_NAME[token.Type], Value:this.Scanner.Source.slice(token.Start, token.End)};

                this.Buffer.push(entry);
            }
        }

        return this.Buffer.shift();
    }
}

var Syntax = {
    AssignmentExpression: 'AssignmentExpression',
    AssignmentPattern: 'AssignmentPattern',
    ArrayExpression: 'ArrayExpression',
    ArrayPattern: 'ArrayPattern',
    ArrowFunctionExpression: 'ArrowFunctionExpression',
    AwaitExpression: 'AwaitExpression',
    BlockStatement: 'BlockStatement',
    BinaryExpression: 'BinaryExpression',
    BreakStatement: 'BreakStatement',
    CallExpression: 'CallExpression',
    CatchClause: 'CatchClause',
    ClassBody: 'ClassBody',
    ClassDeclaration: 'ClassDeclaration',
    ClassExpression: 'ClassExpression',
    ConditionalExpression: 'ConditionalExpression',
    ContinueStatement: 'ContinueStatement',
    DoWhileStatement: 'DoWhileStatement',
    DebuggerStatement: 'DebuggerStatement',
    EmptyStatement: 'EmptyStatement',
    ExportAllDeclaration: 'ExportAllDeclaration',
    ExportDefaultDeclaration: 'ExportDefaultDeclaration',
    ExportNamedDeclaration: 'ExportNamedDeclaration',
    ExportSpecifier: 'ExportSpecifier',
    ExpressionStatement: 'ExpressionStatement',
    ForStatement: 'ForStatement',
    ForOfStatement: 'ForOfStatement',
    ForInStatement: 'ForInStatement',
    FunctionDeclaration: 'FunctionDeclaration',
    FunctionExpression: 'FunctionExpression',
    Identifier: 'Identifier',
    IfStatement: 'IfStatement',
    ImportDeclaration: 'ImportDeclaration',
    ImportDefaultSpecifier: 'ImportDefaultSpecifier',
    ImportNamespaceSpecifier: 'ImportNamespaceSpecifier',
    ImportSpecifier: 'ImportSpecifier',
    Literal: 'Literal',
    LabeledStatement: 'LabeledStatement',
    LogicalExpression: 'LogicalExpression',
    MemberExpression: 'MemberExpression',
    MetaProperty: 'MetaProperty',
    MethodDefinition: 'MethodDefinition',
    NewExpression: 'NewExpression',
    ObjectExpression: 'ObjectExpression',
    ObjectPattern: 'ObjectPattern',
    Program: 'Program',
    Property: 'Property',
    RestElement: 'RestElement',
    ReturnStatement: 'ReturnStatement',
    SequenceExpression: 'SequenceExpression',
    SpreadElement: 'SpreadElement',
    Super: 'Super',
    SwitchCase: 'SwitchCase',
    SwitchStatement: 'SwitchStatement',
    TaggedTemplateExpression: 'TaggedTemplateExpression',
    TemplateElement: 'TemplateElement',
    TemplateLiteral: 'TemplateLiteral',
    ThisExpression: 'ThisExpression',
    ThrowStatement: 'ThrowStatement',
    TryStatement: 'TryStatement',
    UnaryExpression: 'UnaryExpression',
    UpdateExpression: 'UpdateExpression',
    VariableDeclaration: 'VariableDeclaration',
    VariableDeclarator: 'VariableDeclarator',
    WhileStatement: 'WhileStatement',
    WithStatement: 'WithStatement',
    YieldExpression: 'YieldExpression'
};


function Node()
{
    this.IsNeedIndexData=false;         //是否需要大盘数据
    this.IsNeedLatestData=false;        //是否需要最新的个股行情数据
    this.IsNeedSymbolData=false;        //是否需要下载股票数据
    this.IsNeedFinanceData=new Set();   //需要下载的财务数据

    this.GetDataJobList=function()  //下载数据任务列表
    {
        let jobs=[];
        if (this.IsNeedSymbolData) jobs.push(JS_EXECUTE_JOB_ID.JOB_DOWNLOAD_SYMBOL_DATA);
        if (this.IsNeedIndexData) jobs.push(JS_EXECUTE_JOB_ID.JOB_DOWNLOAD_INDEX_DATA);
        if (this.IsNeedLatestData) jobs.push(JS_EXECUTE_JOB_ID.JOB_DOWNLOAD_SYMBOL_LATEST_DATA);

        //加载财务数据
        for(var jobID of this.IsNeedFinanceData)
        {
            jobs.push(jobID);
        }

        return jobs;
    }

    this.VerifySymbolVariable=function(varName)
    {
        let setIndexName=new Set(['INDEXA','INDEXC','INDEXH','INDEXL',"INDEXO","INDEXV"]);
        if (setIndexName.has(varName)) 
        {
            this.IsNeedIndexData=true;
            return;
        }

        let setSymbolDataName=new Set(['CLOSE','C','VOL','V','OPEN','O','HIGH','H','LOW','L','AMOUNT']);
        if (setSymbolDataName.has(varName)) 
        {
            this.IsNeedSymbolData=true;
            return;
        }

        //流通股本（手）
        if (varName==='CAPITAL')
        {
            if (!this.IsNeedFinanceData.has(JS_EXECUTE_JOB_ID.JOB_DOWNLOAD_CAPITAL_DATA))
                this.IsNeedFinanceData.add(JS_EXECUTE_JOB_ID.JOB_DOWNLOAD_CAPITAL_DATA);
        }
    }

    this.VerifySymbolFunction=function(callee,args)
    {
        if (callee.Name=='DYNAINFO') 
        {
            this.IsNeedLatestData=true;
            return;
        }

        //财务函数
        if (callee.Name=='FINANCE')
        {
            let jobID=JS_EXECUTE_JOB_ID.GetFinnanceJobID(args[0].Value);
            if (jobID && !this.IsNeedFinanceData.has(jobID))  this.IsNeedFinanceData.add(jobID);
        }
    }

    this.ExpressionStatement=function(expression)
    {
        return { Type:Syntax.ExpressionStatement, Expression:expression };
    }

    this.Script=function(body)
    {
        return {Type:Syntax.Program, Body:body, SourceType:'通达信脚本' };
    } 

    this.SequenceExpression=function(expression)
    {
        return {Type:Syntax.SequenceExpression, Expression:expression };
    }

    this.BinaryExpression=function(operator, left, right) 
    {
        let logical = (operator === '||' || operator === '&&' || operator=='AND' || operator=='OR');
        let type = logical ? Syntax.LogicalExpression : Syntax.BinaryExpression;

        return { Type:type, Operator:operator, Left:left, Right:right };
    }

    this.Literal=function(value,raw)
    {
        return { Type:Syntax.Literal, Value:value, Raw:raw };
    }

    this.Identifier=function(name)
    {
        this.VerifySymbolVariable(name);

        return { Type:Syntax.Identifier, Name:name};
    }

    this.AssignmentExpression=function (operator, left, right) 
    {
        return { Type:Syntax.AssignmentExpression, Operator:operator, Left:left, Right:right };
    }

    this.UnaryExpression=function(operator, argument) 
    {
        return { Type:Syntax.UnaryExpression, Operator:operator, Argument:argument, Prefix:true };
    }

    this.EmptyStatement=function() 
    {
        return { Type:Syntax.EmptyStatement };
    }

    this.CallExpression=function(callee, args) 
    {
        this.VerifySymbolFunction(callee, args);

        return { Type:Syntax.CallExpression, Callee:callee, Arguments:args };
    }
}



function JSParser(code)
{
    this.ErrorHandler=new ErrorHandler();
    this.Scanner=new Scanner(code, this.ErrorHandler);
    this.Node=new Node();   //节点创建

    this.LookAhead={Type:2, Value:'', LineNumber:this.Scanner.LineNumber, LineStart:0, Start:0, End:0 };
    this.HasLineTerminator=false;
    this.Context = {
        IsModule: false,
        await: false,
        allowIn: true,
        allowStrictDirective: true,
        allowYield: true,
        FirstCoverInitializedNameError: null,
        IsAssignmentTarget: false,
        IsBindingElement: false,
        InFunctionBody: false,
        inIteration: false,
        inSwitch: false,
        labelSet: {},
        Strict: false
    };

    this.PeratorPrecedence = 
    {
        ')': 0,
        ';': 0,
        ',': 0,
        '=': 0,
        ']': 0,
        '||': 1,
        'OR':1,
        '&&': 2,
        'AND':2,
        '|': 3,
        '^': 4,
        '&': 5,
        '==': 6,
        '!=': 6,
        '===': 6,
        '!==': 6,
        '<': 7,
        '>': 7,
        '<=': 7,
        '>=': 7,
        '<<': 8,
        '>>': 8,
        '>>>': 8,
        '+': 9,
        '-': 9,
        '*': 11,
        '/': 11,
        '%': 11
    };

    this.StartMarker={Index:0, Line: this.Scanner.LineNumber, Column:0 };
    this.LastMarker={Index:0, Line: this.Scanner.LineNumber, Column:0 };

    this.Initialize=function()
    {
        this.NextToken();
        this.LastMarker={ Index:this.Scanner.Index, Line:this.Scanner.LineNumber, Column:this.Scanner.Index-this.Scanner.LineStart };
    }
    

    this.CreateNode=function()
    {
        return { Index:this.StartMarker.Index, Line:this.StartMarker.Line, Column:this.StartMarker.Column };
    }

    this.StartNode=function(token, lastLineStart)
    {
        if (lastLineStart==void 0) { lastLineStart=0; }

        let column = token.Start - token.LineStart;
	    let line = token.LineNumber;
        if (column < 0) 
        {
	        column += lastLineStart;
	        line--;
        }
        
	    return { Index: token.Start, Line: line, Column: column };
    }

    this.Match=function(value)
    {
        return this.LookAhead.Type==7 /*Punctuator*/ && this.LookAhead.Value==value;
    }

    this.Expect=function(value)
    {
        let token=this.NextToken();
        if (token.Type!=7 /*Punctuator*/ || token.Value!=value)
            this.ThrowUnexpectedToken(token);
    }

    //是否是赋值操作符
    this.MatchAssign=function()
    {
        if (this.LookAhead.Type!=7 /*Punctuator*/) return false;
        let op=this.LookAhead.Value;

        return op=='=' || op==':' || op==':=';
    }

    this.GetTokenRaw=function(token)
    {
        return this.Scanner.Source.slice(token.Start, token.End);
    }

    this.NextToken=function()
    {
        let token=this.LookAhead;
        this.LastMarker.Index=this.Scanner.Index;
        this.LastMarker.Line=this.Scanner.LineNumber;
        this.LastMarker.Column=this.Scanner.Index-this.Scanner.LineStart;
        this.CollectComments(); //过滤注释 空格

        if (this.Scanner.Index !== this.StartMarker.Index) 
        {
            this.StartMarker.Index = this.Scanner.Index;
            this.StartMarker.Line = this.Scanner.LineNumber;
            this.StartMarker.Column = this.Scanner.Index - this.Scanner.LineStart;
        }

        let next=this.Scanner.Lex();
        this.HasLineTerminator=(token.LineNumber!=next.LineNumber);
        if (next && this.Context.Strict && next.Type==3/*Identifier */)
        {
            //TODO:
        }

        this.LookAhead=next;

        return token;
    }

    this.CollectComments=function()
    {
        this.Scanner.ScanComments();
    }

    this.ParseScript=function()
    {
        let node=this.CreateNode();
        let body=this.ParseDirectivePrologues();
        
        while(this.LookAhead.Type!=2 /*EOF*/)
        {
            body.push(this.ParseStatementListItem())
        }

        return this.Finalize(node,this.Node.Script(body));
    }

    //https://tc39.github.io/ecma262/#sec-directive-prologues-and-the-use-strict-directive
    this.ParseDirective=function()
    {
        let token=this.LookAhead;
        let node=this.CreateNode();
        let expr=this.ParseExpression();
    }

    this.ParseDirectivePrologues=function()
    {
        let firstRestricted=null;
        let body=[];
        while(true)
        {
            let token=this.LookAhead;
            if (token.Type!=8 /*StringLiteral*/) break;

            let statement=this.ParseDirective();
            body.push(statement);
        }

        return body;
    }

    // https://tc39.github.io/ecma262/#sec-block
    this.ParseStatementListItem=function()
    {
        let statement;
        this.Context.IsAssignmentTarget=true;
        this.Context.IsBindingElement=true;
        if (this.LookAhead.Type==4 /*Keyword*/)
        {

        }
        else
        {
            statement=this.ParseStatement();
        }

        return statement;
    }

    // https://tc39.github.io/ecma262/#sec-ecmascript-language-statements-and-declarations
    this.ParseStatement=function()
    {
        let statement;
        switch(this.LookAhead.Type)
        {
            case 1 /* BooleanLiteral */:
            case 5 /* NullLiteral */:
            case 6 /* NumericLiteral */:
            case 8 /* StringLiteral */:
            case 10 /* Template */:
            case 9 /* RegularExpression */:
                statement = this.ParseExpressionStatement();
                break;
            case 7 /* Punctuator */:
                let value = this.LookAhead.Value;
                if (value === '(') statement = this.ParseExpressionStatement();
                else if (value === ';') statement = this.ParseEmptyStatement();
                else statement = this.ParseExpressionStatement();
                break;
            case 3 /* Identifier */:
                statement = this.ParseLabelledStatement();
                break;
            case 4 /* Keyword */:
                break;
            default:
                statement="error";
        }

        return statement;
    }
    
    // https://tc39.github.io/ecma262/#sec-empty-statement
    this.ParseEmptyStatement=function()
    {
        let node=this.CreateNode();
        this.Expect(';');
        return this.Finalize(node, this.Node.EmptyStatement());
    }

    //https://tc39.github.io/ecma262/#sec-labelled-statements
    this.ParseLabelledStatement=function()
    {
        let node=this.CreateNode();
        let expr=this.ParseExpression();
        this.ConsumeSemicolon();
        let statement = new this.Node.ExpressionStatement(expr);

        return this.Finalize(node, statement);
    }

    // https://tc39.github.io/ecma262/#sec-comma-operator
    this.ParseExpression=function()
    {
        let startToken=this.LookAhead;
        let expr=this.IsolateCoverGrammar(this.ParseAssignmentExpression);
        if (this.Match(','))
        {
            let expressions=[];
            expressions.push(expr);
            while(this.LookAhead.Type!=2 /*EOF*/)
            {
                if (!this.Match(',')) break;
                this.NextToken();
                expressions.push(this.IsolateCoverGrammar(this.ParseAssignmentExpression));
            }

            expr=this.Finalize(this.StartNode(startToken),this.Node.SequenceExpression(expressions));
        }

        return expr;
    }

    this.ParseAssignmentExpression=function()
    {
        let expr;

        let startToken=this.LookAhead;
        let token=startToken;
        expr=this.ParseConditionalExpression();

        if (this.MatchAssign())
        {
            if (!this.Context.IsAssignmentTarget) 
            {
                let marker=expr.Marker;
                this.ThrowUnexpectedError(marker.Index,marker.Line,marker.Column,Messages.InvalidLHSInAssignment);
            }

            if (!this.Match('=') && !this.Match(':'))
            {
                this.Context.IsAssignmentTarget=false;
                this.Context.IsBindingElement=false;
            }
            else
            {
                this.ReinterpretExpressionAsPattern(expr);
            }

            token=this.NextToken();
            let operator=token.Value;
            let right=this.IsolateCoverGrammar(this.ParseAssignmentExpression);
            expr=this.Finalize(this.StartNode(startToken), this.Node.AssignmentExpression(operator, expr, right));
            this.Context.FirstCoverInitializedNameError=null;
        }

        return expr;
    }

    this.ParseConditionalExpression=function()
    {
        let startToken=this.LookAhead;
        let expr=this.InheritCoverGrammar(this.ParseBinaryExpression);

        return expr;
    }

    this.ParseBinaryExpression=function()
    {
        let startToken=this.LookAhead;
        let expr=this.InheritCoverGrammar(this.ParseExponentiationExpression);
        let token=this.LookAhead;
        var prec=this.BinaryPrecedence(token);
        if (prec>0)
        {
            this.NextToken();
            this.Context.IsAssignmentTarget=false;
            this.Context.IsBindingElement=false;
            let markers=[startToken,this.LookAhead];
            let left=expr;
            let right=this.IsolateCoverGrammar(this.ParseExponentiationExpression);
            let stack=[left,token.Value,right];
            let precedences = [prec];
            while(true)
            {
                prec=this.BinaryPrecedence(this.LookAhead);
                if (prec<=0) break;

                while(stack.length>2 && prec<=precedences[precedences.length-1])
                {
                    right=stack.pop();
                    let operator=stack.pop();
                    precedences.pop();
                    left=stack.pop();
                    markers.pop();
                    let node=this.StartNode(markers[markers.length - 1]);
                    stack.push(this.Finalize(node, this.Node.BinaryExpression(operator, left, right)));
                }

                //Shift
                stack.push(this.NextToken().Value);
                precedences.push(prec);
                markers.push(this.LookAhead);
                stack.push(this.IsolateCoverGrammar(this.ParseExponentiationExpression));
            }

            let i=stack.length-1;
            expr=stack[i];
            let lastMarker=markers.pop();
            while(i>1)
            {
                let marker=markers.pop();
                let lastLineStart=lastMarker && lastMarker.LineStart;
                let node=this.StartNode(marker, lastLineStart);
                let operator=stack[i-1];
                expr=this.Finalize(node, this.Node.BinaryExpression(operator, stack[i - 2], expr));
                i-=2;
                lastMarker=marker;
            }
        }

        return expr;
    }

    this.ParseExponentiationExpression=function()
    {
        let startToken=this.LookAhead;
        let expr=this.InheritCoverGrammar(this.ParseUnaryExpression);

        return expr;
    }

    this.ParseUnaryExpression=function()
    {
        let expr;
        if (this.Match('+') || this.Match('-'))
        {
            let node=this.StartNode(this.LookAhead);
            let token=this.NextToken();
            expr=this.InheritCoverGrammar(this.ParseUnaryExpression);
            expr=this.Finalize(node, this.Node.UnaryExpression(token.Value, expr));
            this.Context.IsAssignmentTarget=false;
            this.Context.IsBindingElement=false;
        }
        else
        {
            expr=this.ParseUpdateExpression();
        }

        return expr;
    }

    // https://tc39.github.io/ecma262/#sec-update-expressions
    this.ParseUpdateExpression=function()
    {
        let expr;
        let startToken=this.LookAhead;
        expr=this.InheritCoverGrammar(this.ParseLeftHandSideExpressionAllowCall);

        return expr;
    }

    this.ParseLeftHandSideExpressionAllowCall=function()
    {
        let startToken=this.LookAhead;
        let expr;
        expr=this.InheritCoverGrammar(this.ParsePrimaryExpression);

        while(true)
        {
            if (this.Match('('))
            {
                this.Context.IsBindingElement=false;
                this.Context.IsAssignmentTarget=false;
                var args=this.ParseArguments(); //解析 调用参数
                expr=this.Finalize(this.StartNode(startToken), this.Node.CallExpression(expr,args));
            }
            else
            {
                break;
            }
        }

        return expr;
    }

    // https://tc39.github.io/ecma262/#sec-left-hand-side-expressions
    this.ParseArguments=function()
    {
        this.Expect('(');
        var args=[];
        if (!this.Match(')'))
        {
            while(true)
            {
                let expr=this.IsolateCoverGrammar(this.ParseAssignmentExpression);
                args.push(expr);

                if (this.Match(')')) break;

                this.ExpectCommaSeparator();

                if (this.Match(')')) break;
            }
        }

        this.Expect(')');
        return args;
    }

    // Quietly expect a comma when in tolerant mode, otherwise delegates to expect().
    this.ExpectCommaSeparator=function()
    {
        this.Expect(',');
    }

    // https://tc39.github.io/ecma262/#sec-primary-expression
    this.ParsePrimaryExpression=function()
    {
        let node=this.CreateNode();
        let expr;
        var token, raw;
        switch(this.LookAhead.Type)
        {
            case 3:/* Identifier */
                expr=this.Finalize(node, this.Node.Identifier(this.NextToken().Value));
                break;
            case 6:/* NumericLiteral */
            case 8:/* StringLiteral */
                this.Context.IsAssignmentTarget=false;
                this.Context.IsBindingElement=false;
                token=this.NextToken();
                raw=this.GetTokenRaw(token);
                expr=this.Finalize(node, this.Node.Literal(token.Value,raw));
                break;
            case 7:/* Punctuator */
                switch(this.LookAhead.Value)
                {
                    case '(':
                        this.Context.IsBindingElement=false;
                        expr=this.InheritCoverGrammar(this.ParseGroupExpression);
                        break;
                    default:
                        expr=this.ThrowUnexpectedToken(this.NextToken())
                }
                break;
            default:
                expr = this.ThrowUnexpectedToken(this.NextToken());
        }

        return expr;
    }

    this.ParseGroupExpression=function()
    {
        let expr;
        this.Expect('(');
        if (this.Match(')'))
        {
            this.NextToken();
        }
        else
        {
            let startToken=this.LookAhead;
            let params=[];
            let arrow=false;
            this.Context.IsBindingElement=true;
            expr=this.InheritCoverGrammar(this.ParseAssignmentExpression);
            if (this.Match(','))
            {
                let expressions=[];
                this.Context.IsAssignmentTarget=false;
                expressions.push(expr);
                while(this.LookAhead.Type!=2 /* EOF */)
                {
                    if (!this.Match(',')) break;

                    this.NextToken();
                    if (this.Match(')'))
                    {

                    }
                }
            }

            if (!arrow)
            {
                this.Expect(')');
                this.Context.IsBindingElement=false;
            }
        }

        return expr;
    }

    // https://tc39.github.io/ecma262/#sec-expression-statement
    this.ParseExpressionStatement=function()
    {
        let node=this.CreateNode();
        let expr=this.ParseExpression();
        this.ConsumeSemicolon();

        return this.Finalize(node,this.Node.ExpressionStatement(expr));
    }

    this.ConsumeSemicolon=function()
    {
        if (this.Match(';')) 
        {
            this.NextToken();
        }
        else if (!this.HasLineTerminator)
        {
            //if (this.LookAhead.Type!=2/*EOF*/ && !this.Match('}'))

            this.LastMarker.Index=this.StartMarker.Index;
            this.LastMarker.Line=this.StartMarker.Line;
            this.LastMarker.Column=this.StartMarker.Column;
        }
    }

    this.ReinterpretExpressionAsPattern=function(expr)
    {
        switch(expr.Type)
        {
            case Syntax.Identifier:
            case Syntax.AssignmentExpression:
                break;
            default:
                break;
        }
    }

    this.Finalize=function(marker,node)
    {
        node.Marker={ Line:marker.Line, Column:marker.Column, Index:marker.Index };
        return node;
    }

    this.BinaryPrecedence = function (token) 
    {
        let op = token.Value;
        let precedence;

        if (token.Type === 7 /* Punctuator */) precedence = this.PeratorPrecedence[op] || 0;
        else precedence = 0;
        
        return precedence;
    };

    this.IsolateCoverGrammar=function(parseFunction)
    {
        let previousIsBindingElement=this.Context.IsBindingElement;
        let previousIsAssignmentTarget=this.Context.IsAssignmentTarget;
        let previousFirstCoverInitializedNameError=this.Context.FirstCoverInitializedNameError;

        this.Context.IsBindingElement=true;
        this.Context.IsAssignmentTarget=true;
        this.Context.FirstCoverInitializedNameError=null;
        let result=parseFunction.call(this);

        if (this.Context.FirstCoverInitializedNameError!=null)
        {
            //错误 this.throwUnexpectedToken(this.context.firstCoverInitializedNameError);
        }

        this.Context.IsBindingElement=previousIsBindingElement;
        this.Context.IsAssignmentTarget=previousIsAssignmentTarget;
        this.Context.FirstCoverInitializedNameError=previousFirstCoverInitializedNameError;

        return result;
    }

    this.InheritCoverGrammar = function (parseFunction) 
    {
        let previousIsBindingElement = this.Context.IsBindingElement;
        let previousIsAssignmentTarget = this.Context.IsAssignmentTarget;
        let previousFirstCoverInitializedNameError = this.Context.FirstCoverInitializedNameError;
        this.Context.IsBindingElement = true;
        this.Context.IsAssignmentTarget = true;
        this.Context.FirstCoverInitializedNameError = null;

        let result = parseFunction.call(this);

        this.Context.IsBindingElement = this.Context.IsBindingElement && previousIsBindingElement;
        this.Context.IsAssignmentTarget = this.Context.IsAssignmentTarget && previousIsAssignmentTarget;
        this.Context.FirstCoverInitializedNameError = previousFirstCoverInitializedNameError || this.Context.FirstCoverInitializedNameError;

        return result;
    };

    this.ThrowUnexpectedToken=function(token,message)
    {
        throw this.UnexpectedTokenError(token,message);
    }

    this.ThrowUnexpectedError=function(index,line,column,message)
    {
        let msg=message || "执行异常";
       
        return this.ErrorHandler.ThrowError(index,line,column,msg);
    }

    this.UnexpectedTokenError=function(token,message)
    {
        let msg=message || Messages.UnexpectedToken;
        let value='ILLEGAL';
        if (token)
        {
            if (!message)
            {

            }
            value=token.Value;
        }

        msg=msg.replace("%0",value);
        if (token && typeof(token.LineNumber)=='number')
        {
            let index=token.Start;
            let line=token.LineNumber;
            let lastMarkerLineStart=this.LastMarker.Index-this.LastMarker.Column;
            let column=token.Start-lastMarkerLineStart+1;
            return this.ErrorHandler.CreateError(index,line,column,msg);
        }
        else
        {
            let index=this.LastMarker.Index;
            let line=this.LastMarker.Line;
            let column=this.LastMarker.Column+1;
            return this.ErrorHandler.CreateError(index,line,column,msg);
        }
    }
}


/*
    算法类
*/
function JSAlgorithm(errorHandler)
{
    this.ErrorHandler=errorHandler;

    //相加
    this.Add=function(data,data2)
    {
        let isNumber=typeof(data)=='number';
        let isNumber2=typeof(data2)=='number';

        //单数值相加
        if (isNumber && isNumber2) return data+data2;

        //都是数组相加
        let result=[];
        if (!isNumber && !isNumber2)
        {
            let count=Math.max(data.length, data2.length);
            for(let i=0;i<count;++i)
            {
                result[i]=null; //初始化

                if (i<data.length && i<data2.length)
                {
                    if ( !isNaN(data[i]) && !isNaN(data2[i]) ) result[i]=data[i]+data2[i];
                }
            }

            return result;
        }

        //单数据和数组相加
        let value;
        let aryData;
        if (isNumber) 
        {
            value=data;
            aryData=data2;
        }
        else
        {
            value=data2;
            aryData=data;
        }

        for(let i in aryData)
        {
            result[i]=null;
            if (!isNaN(aryData[i]) && !isNaN(value)) result[i]=value+aryData[i];
        }

        return result;
    }

    //相减
    this.Subtract=function(data,data2)
    {
        let isNumber=typeof(data)=='number';
        let isNumber2=typeof(data2)=='number';

         //单数值相减
         if (isNumber && isNumber2) return data-data2;

         //都是数组相减
        let result=[];
        if (!isNumber && !isNumber2)
        {
            let count=Math.max(data.length, data2.length);
            for(let i=0;i<count;++i)
            {
                result[i]=null; //初始化

                if (i<data.length && i<data2.length)
                {
                    if ( !isNaN(data[i]) && !isNaN(data2[i]) ) result[i]=data[i]-data2[i];
                }
            }

            return result;
        }

        if (isNumber)   //单数据-数组
        {
            for(let i in data2)
            {
                result[i]=null;
                if (!isNaN(data) && !isNaN(data2[i])) result[i]=data-data2[i];
            }
        }
        else            //数组-单数据
        {
            for(let i in data)
            {
                result[i]=null;
                if (!isNaN(data[i]) && !isNaN(data2)) result[i]=data[i]-data2;
            }
        }

        return result;
    }

    //相乘
    this.Multiply=function(data,data2)
    {
        let isNumber=typeof(data)=='number';
        let isNumber2=typeof(data2)=='number';

        //单数值相乘
        if (isNumber && isNumber2) return data*data2;

        //都是数组相乘
        let result=[];
        if (!isNumber && !isNumber2)
        {
            let count=Math.max(data.length, data2.length);
            for(let i=0;i<count;++i)
            {
                result[i]=null; //初始化

                if (i<data.length && i<data2.length)
                {
                    if ( !isNaN(data[i]) && !isNaN(data2[i]) ) result[i]=data[i]*data2[i];
                }
            }

            return result;
        }

        //单数据和数组相乘
        let value;
        let aryData;
        if (isNumber) 
        {
            value=data;
            aryData=data2;
        }
        else
        {
            value=data2;
            aryData=data;
        }

        for(let i in aryData)
        {
            result[i]=null;
            if (!isNaN(aryData[i]) && !isNaN(value)) result[i]=value*aryData[i];
        }

        return result;
    }

    //相除
    this.Divide=function(data,data2)
    {
        let isNumber=typeof(data)=='number';
        let isNumber2=typeof(data2)=='number';

        //单数值相除
        if (isNumber && isNumber2) 
        {
            if (data2==0) return null;  //除0判断
            return data/data2;
        }

        //都是数组相除
        let result=[];
        if (!isNumber && !isNumber2)
        {
            let count=Math.max(data.length, data2.length);
            for(let i=0;i<count;++i)
            {
                result[i]=null; //初始化

                if (i<data.length && i<data2.length)
                {
                    if ( this.IsNumber(data[i]) && this.IsDivideNumber(data2[i]) ) result[i]=data[i]/data2[i];
                }
            }

            return result;
        }

        if (isNumber)   //单数据-数组
        {
            for(let i in data2)
            {
                result[i]=null;
                if ( this.IsNumber(data) && this.IsDivideNumber(data2[i]) ) result[i]=data/data2[i];
            }
        }
        else            //数组-单数据
        {
            for(let i in data)
            {
                result[i]=null;
                if ( this.IsNumber(data[i]) && this.IsDivideNumber(data2) ) result[i]=data[i]/data2;
            }
        }

        return result;

    }

    //大于
    this.GT=function(data,data2)
    {
        let isNumber=typeof(data)=='number';
        let isNumber2=typeof(data2)=='number';

        //单数值比较
        if (isNumber && isNumber2) return (data>data2 ? 1 : 0);

        //都是数组比较
        let result=[];
        if (!isNumber && !isNumber2)
        {
            let count=Math.max(data.length, data2.length);
            for(let i=0;i<count;++i)
            {
                result[i]=null; //初始化

                if (i<data.length && i<data2.length)
                {
                    if ( !isNaN(data[i]) && !isNaN(data2[i]) ) result[i]=(data[i]>data2[i] ? 1:0);
                }
            }

            return result;
        }

        if (isNumber)   //单数据-数组
        {
            for(let i in data2)
            {
                result[i]=null;
                if ( !isNaN(data) && !isNaN(data2[i]) ) result[i]=(data>data2[i] ? 1 : 0);
            }
        }
        else            //数组-单数据
        {
            for(let i in data)
            {
                result[i]=null;
                if ( !isNaN(data[i]) && !isNaN(data2) ) result[i]=(data[i]>data2 ? 1 : 0);
            }
        }

        return result;
    }

    //大于等于
    this.GTE=function(data,data2)
    {
        let isNumber=typeof(data)=='number';
        let isNumber2=typeof(data2)=='number';

        //单数值比较
        if (isNumber && isNumber2) return (data>=data2 ? 1 : 0);

        //都是数组比较
        let result=[];
        if (!isNumber && !isNumber2)
        {
            let count=Math.max(data.length, data2.length);
            for(let i=0;i<count;++i)
            {
                result[i]=null; //初始化

                if (i<data.length && i<data2.length)
                {
                    if ( !isNaN(data[i]) && !isNaN(data2[i]) ) result[i]=(data[i]>=data2[i] ? 1:0);
                }
            }

            return result;
        }

        if (isNumber)   //单数据-数组
        {
            for(let i in data2)
            {
                result[i]=null;
                if ( !isNaN(data) && !isNaN(data2[i]) ) result[i]=(data>=data2[i] ? 1 : 0);
            }
        }
        else            //数组-单数据
        {
            for(let i in data)
            {
                result[i]=null;
                if ( !isNaN(data[i]) && !isNaN(data2) ) result[i]=(data[i]>=data2 ? 1 : 0);
            }
        }

        return result;
    }

    //小于
    this.LT=function(data,data2)
    {
        let isNumber=typeof(data)=='number';
        let isNumber2=typeof(data2)=='number';

        //单数值比较
        if (isNumber && isNumber2) return (data>=data2 ? 1 : 0);

        //都是数组比较
        let result=[];
        if (!isNumber && !isNumber2)
        {
            let count=Math.max(data.length, data2.length);
            for(let i=0;i<count;++i)
            {
                result[i]=null; //初始化

                if (i<data.length && i<data2.length)
                {
                    if ( !isNaN(data[i]) && !isNaN(data2[i]) ) result[i]=(data[i]<data2[i] ? 1:0);
                }
            }

            return result;
        }

        if (isNumber)   //单数据-数组
        {
            for(let i in data2)
            {
                result[i]=null;
                if ( !isNaN(data) && !isNaN(data2[i]) ) result[i]=(data<data2[i] ? 1 : 0);
            }
        }
        else            //数组-单数据
        {
            for(let i in data)
            {
                result[i]=null;
                if ( !isNaN(data[i]) && !isNaN(data2) ) result[i]=(data[i]<data2 ? 1 : 0);
            }
        }

        return result;
    }

    //小于等于
    this.LTE=function(data,data2)
    {
        let isNumber=typeof(data)=='number';
        let isNumber2=typeof(data2)=='number';

        //单数值比较
        if (isNumber && isNumber2) return (data>=data2 ? 1 : 0);

        //都是数组比较
        let result=[];
        if (!isNumber && !isNumber2)
        {
            let count=Math.max(data.length, data2.length);
            for(let i=0;i<count;++i)
            {
                result[i]=null; //初始化

                if (i<data.length && i<data2.length)
                {
                    if ( !isNaN(data[i]) && !isNaN(data2[i]) ) result[i]=(data[i]<=data2[i] ? 1:0);
                }
            }

            return result;
        }

        if (isNumber)   //单数据-数组
        {
            for(let i in data2)
            {
                result[i]=null;
                if ( !isNaN(data) && !isNaN(data2[i]) ) result[i]=(data<=data2[i] ? 1 : 0);
            }
        }
        else            //数组-单数据
        {
            for(let i in data)
            {
                result[i]=null;
                if ( !isNaN(data[i]) && !isNaN(data2) ) result[i]=(data[i]<=data2 ? 1 : 0);
            }
        }

        return result;
    }

    //等于
    this.EQ=function(data,data2)
    {
        let isNumber=typeof(data)=='number';
        let isNumber2=typeof(data2)=='number';

        //单数值比较
        if (isNumber && isNumber2) return (data==data2 ? 1 : 0);

        //都是数组比较
        let result=[];
        if (!isNumber && !isNumber2)
        {
            let count=Math.max(data.length, data2.length);
            for(let i=0;i<count;++i)
            {
                result[i]=null; //初始化

                if (i<data.length && i<data2.length)
                {
                    if ( !isNaN(data[i]) && !isNaN(data2[i]) ) result[i]=(data[i]==data2[i] ? 1:0);
                }
            }

            return result;
        }

        if (isNumber)   //单数据-数组
        {
            for(let i in data2)
            {
                result[i]=null;
                if ( !isNaN(data) && !isNaN(data2[i]) ) result[i]=(data==data2[i] ? 1 : 0);
            }
        }
        else            //数组-单数据
        {
            for(let i in data)
            {
                result[i]=null;
                if ( !isNaN(data[i]) && !isNaN(data2) ) result[i]=(data[i]==data2 ? 1 : 0);
            }
        }

        return result;
    }

    //AND  &&
    this.And=function(data,data2)
    {
        let isNumber=typeof(data)=='number';
        let isNumber2=typeof(data2)=='number';

        //单数值 &&
        if (isNumber && isNumber2) return (data && data2 ? 1 : 0);

        //都是数组 &&
        let result=[];
        if (!isNumber && !isNumber2)
        {
            let count=Math.max(data.length, data2.length);
            for(let i=0;i<count;++i)
            {
                result[i]=null; //初始化

                if (i<data.length && i<data2.length)
                {
                    if ( !isNaN(data[i]) && !isNaN(data2[i]) ) result[i]=(data[i] && data2[i] ? 1:0);
                }
            }

            return result;
        }

        if (isNumber)   //单数据-数组
        {
            for(let i in data2)
            {
                result[i]=null;
                if ( !isNaN(data) && !isNaN(data2[i]) ) result[i]=(data && data2[i] ? 1 : 0);
            }
        }
        else            //数组-单数据
        {
            for(let i in data)
            {
                result[i]=null;
                if ( !isNaN(data[i]) && !isNaN(data2) ) result[i]=(data[i] && data2 ? 1 : 0);
            }
        }

        return result;
    }

    //OR  ||
    this.Or=function(data,data2)
    {
        let isNumber=typeof(data)=='number';
        let isNumber2=typeof(data2)=='number';

        //单数值 &&
        if (isNumber && isNumber2) return (data || data2 ? 1 : 0);

        //都是数组 &&
        let result=[];
        if (!isNumber && !isNumber2)
        {
            let count=Math.max(data.length, data2.length);
            for(let i=0;i<count;++i)
            {
                result[i]=null; //初始化

                if (i<data.length && i<data2.length)
                {
                    if ( !isNaN(data[i]) && !isNaN(data2[i]) ) result[i]=(data[i] || data2[i] ? 1:0);
                }
            }

            return result;
        }

        if (isNumber)   //单数据-数组
        {
            for(let i in data2)
            {
                result[i]=null;
                if ( !isNaN(data) && !isNaN(data2[i]) ) result[i]=(data || data2[i] ? 1 : 0);
            }
        }
        else            //数组-单数据
        {
            for(let i in data)
            {
                result[i]=null;
                if ( !isNaN(data[i]) && !isNaN(data2) ) result[i]=(data[i] || data2 ? 1 : 0);
            }
        }

        return result;
    }

    this.IF=function(data,trueData,falseData)
    {
        let isNumber=typeof(data)=='number';
        let isNumber2=typeof(trueData)=='number';
        let isNumber3=typeof(falseData)=='number';
        
        //单数值
        if (isNumber) 
        {
            if (isNumber2 && isNumber3) return data?trueData:falseData;

            return data? trueData:falseData;
        }
        
        //都是数组
        let result=[];
        for(let i in data)
        {
            if (data[i])
            {
                if (isNumber2) result[i]=trueData;
                else result[i]=trueData[i];
            }
            else
            {
                if (isNumber3) result[i]=falseData;
                else result[i]=falseData[i];
            }
        }

        return result;
    }


    //指标函数 函数名全部大写
    this.REF=function(data,n)
    {
        let result=[];
        if (typeof(n)=='number')
        {
            if (data.length<=0) return result;
            if (n>=data.length) return result;

            result=data.slice(0,data.length-n);

            for(let i=0;i<n;++i)
                result.unshift(null);
        }
        else    //n 为数组的情况
        {
            for(let i=0;i<data.length;++i)
            {
                result[i]=null;
                if (i>=n.length) continue;
                var value=n[i];
                if (value>0 && value<=i) result[i]=data[i-value];
                else if (i) result[i]=result[i-1];
                else result[i]=data[i];
            }
        }

        return result;
        
    }

    this.MAX=function(data,data2)
    {
        let isNumber=typeof(data)=='number';
        let isNumber2=typeof(data2)=='number';

        //单数值
        if (isNumber && isNumber2) return Math.max(data,data2);

        //都是数组
        let result=[];
        if (!isNumber && !isNumber2)
        {
            let count=Math.max(data.length, data2.length);
            for(let i=0;i<count;++i)
            {
                result[i]=null; //初始化

                if (i<data.length && i<data2.length)
                {
                    if ( !isNaN(data[i]) && !isNaN(data2[i]) ) result[i]=Math.max(data[i], data2[i]);
                }
            }

            return result;
        }

        if (isNumber)   //单数据-数组
        {
            for(let i in data2)
            {
                result[i]=null;
                if ( !isNaN(data) && !isNaN(data2[i]) ) result[i]=Math.max(data, data2[i]);
            }
        }
        else            //数组-单数据
        {
            for(let i in data)
            {
                result[i]=null;
                if ( !isNaN(data[i]) && !isNaN(data2) ) result[i]=Math.max(data[i], data2);
            }
        }

        return result;
    }

    this.MIN=function(data,data2)
    {
        let isNumber=typeof(data)=='number';
        let isNumber2=typeof(data2)=='number';

        //单数值
        if (isNumber && isNumber2) return Math.min(data,data2);

        //都是数组
        let result=[];
        if (!isNumber && !isNumber2)
        {
            let count=Math.max(data.length, data2.length);
            for(let i=0;i<count;++i)
            {
                result[i]=null; //初始化

                if (i<data.length && i<data2.length)
                {
                    if ( !isNaN(data[i]) && !isNaN(data2[i]) ) result[i]=Math.min(data[i], data2[i]);
                }
            }

            return result;
        }

        if (isNumber)   //单数据-数组
        {
            for(let i in data2)
            {
                result[i]=null;
                if ( !isNaN(data) && !isNaN(data2[i]) ) result[i]=Math.min(data, data2[i]);
            }
        }
        else            //数组-单数据
        {
            for(let i in data)
            {
                result[i]=null;
                if ( !isNaN(data[i]) && !isNaN(data2) ) result[i]=Math.min(data[i], data2);
            }
        }

        return result;
    }

    //取正数
    this.ABS=function(data)
    {
        let result=[];

        for(let i in data)
        {
            result[i]=null;
            if (!isNaN(data[i])) result[i]=Math.abs(data[i]);
        }

        return result;
    }

    this.MA=function(data,dayCount)
    {
        let result=[];
        for(let i=0;i<data.length;++i)
        {
            if (i<dayCount)
            {
                result[i]=null;
                continue;
            }

            let sum=0;
            for(let j=0;j<dayCount;++j)
            {
                sum+=data[i-j];
            }

            result[i]=sum/dayCount;
        }

        return result;
    }

    //指数平均数指标 EMA(close,10)
    this.EMA=function(data,dayCount)
    {
        var result = [];

        var offset=0;
        if (offset>=data.length) return result;

        //取首个有效数据
        for(;offset<data.length;++offset)
        {
            if (data[offset]!=null && !isNaN(data[offset]))
                break;
        }

        var p1Index=offset;
        var p2Index=offset+1;

        result[p1Index]=data[p1Index];
        for(var i=offset+1;i<data.length;++i,++p1Index,++p2Index)
        {
            result[p2Index]=((2*data[p2Index]+(dayCount-1)*result[p1Index]))/(dayCount+1);
        }

        return result;
    }

    /* 
        SMA 移动平均
        返回移动平均。
        用法：　SMA(X，N，M)　X的M日移动平均，M为权重，如Y=(X*M+Y'*(N-M))/N 
    */
    this.SMA=function(data,n,m)
    {
        var result = [];

        var i=0;
        var lastData=null;
        for(;i<data.length; ++i)
        {
            if (data[i]==null || isNaN(data[i])) continue;
            lastData=data[i];
            result[i]=lastData; //第一天的数据
            break;
        }

        for(++i;i<data.length;++i)
        {
            result[i]=(m*data[i]+(n-m)*lastData)/n;
            lastData=result[i];
        }

        return result;
    }

    /*
    求动态移动平均.
    用法: DMA(X,A),求X的动态移动平均.
    算法: 若Y=DMA(X,A)则 Y=A*X+(1-A)*Y',其中Y'表示上一周期Y值,A必须小于1.
    例如:DMA(CLOSE,VOL/CAPITAL)表示求以换手率作平滑因子的平均价
    */
    this.DMA=function(data,data2)
    {
        var result = [];
        if (data.length<0 || data.length!=data2.length) return result;

        var index=0;
        for(;index<data.length;++index)
        {
            if (data[index]!=null && !isNaN(data[index]) && data2[index]!=null && !isNaN(data2[index]))
            {
                result[index]=data[index];
                break;
            }
        }

        for(index=index+1;index<data.length;++index)
        {
            if (data[index]==null || data2[index]==null)
                result[index]=null;
            else
            {
                if (data[index]<1)
                    result[index]=(data2[index]*data[index])+(1-data2[index])*result[index-1];
                else
                    result[index]= data[index];
            }
        }

        return result;
    }

    /*
    加权移动平均
    返回加权移动平均
    用法:EXPMA(X,M):X的M日加权移动平均
    EXPMA[i]=buffer[i]*para+(1-para)*EXPMA[i-1] para=2/(1+__para)
    */
    this.EXPMA=function(data,dayCount)
    {
        let result=[];
        if (dayCount>=data.length) return result;
    
        let i=dayCount;
        for(;i<data.length;++i) //获取第1个有效数据
        {
            if (data[i]!=null)
            {
                result[i]=data[i];
                break;
            }
        }
    
        for (i=i+1; i < data.length; ++i)
        {
            if (result[i-1]!=null && data[i]!=null)
                result[i]=(2*data[i]+(dayCount-1)*result[i-1])/(dayCount+1);
            else if (result[i-1]!=null)
                result[i]=result[i-1];
        }
    
        return result;
    }

    //加权平滑平均,MEMA[i]=SMA[i]*para+(1-para)*SMA[i-1] para=2/(1+__para)
    this.EXPMEMA=function(data,dayCount)
    {
        var result=[];
        if (dayCount>=data.length) return result;

        var index=0;
        for(;index<data.length;++index)
        {
            if (data[index] && !isNaN(data[index])) break;
        }

        var sum=0;
        for(var i=0; index<data.length && i<dayCount;++i, ++index)
        {
            if (data[index] && !isNaN(data[index]))
                sum+=data[index];
            else
                sum+=data[index-1];
        }

        result[index-1]=sum/dayCount;
        for(;index<data.length;++index)
        {
            if(result[index-1]!=null && data[index]!=null)
                result[index]=(2*data[index]+(dayCount-1)*result[index-1])/(dayCount+1);
            else if(result[index-1]!=null)
                result[index] = result[index-1];
        }

        return result;
    }

    this.COUNT=function(data,n)
    {
        let result=[];

        for(let i=0; i<data.length; ++i)
        {
            let count=0;
            for(let j=0;j<n;++j)
            {
                if (data[i-j]) ++count;
            }

            result[i]=count;
        }

        return result;
    }

    /*
    HHV 最高值
    求最高值。
    用法：　HHV(X，N)　求N周期内X最高值，N=0则从第一个有效值开始。
    例如：　HHV(HIGH,30)　表示求30日最高价。
    */
    this.HHV=function(data,n)
    {
        let result = [];
        if (n>data.length) return result;

        let max=-10000;
        for(let i=n,j=0;i<data.length;++i,++j)
        {
            if(i<n+max)
            {
                max=data[i]<data[max]?max:i;
            }
            else
            {
                for(j=(max=i-n+1)+1;j<=i;++j)
                {
                    if(data[j]>data[max])
                        max = j;
                }
            }

            result[i] = data[max];
        }

        return result;
    }

    /*
    LLV 最低值
    求最低值。
    用法：　LLV(X，N)　求N周期内X最低值，N=0则从第一个有效值开始。
    例如：　LLV(LOW，0)　表示求历史最低价。
    */
    this.LLV=function(data,n)
    {
        var result = [];
        if (n>data.length) return result;

        var min=-10000;

        for(var i=n;i<data.length;++i,++j)
        {
            if(i<n+min)
            {
                min=data[i]>data[min]?min:i;
            }
            else
            {
                for(var j=(min=i-n+1)+1;j<=i;++j)
                {
                    if(data[j]<data[min])
                        min = j;
                }
            }
            result[i] = data[min];
        }

        return result;
    }

    this.STD=function(data,n)
    {
        var result=[];

        var total=0;
        var averageData=[]; //平均值
        for(var i=n-1;i<data.length;++i)
        {
            total=0;
            for(var j=0;j<n;++j)
            {
                total+=data[i-j];
            }

            averageData[i]=total/n;
        }

        for(var i=n-1;i<data.length;++i)
        {
            total=0;
            for(var j=0;j<n;++j)
            {
                total+=Math.pow((data[i-j]-averageData[i]),2);
            }

            result[i]=Math.sqrt(total/n);
        }


        return result;
    }

    //平均绝对方差
    this.AVEDEV=function(data,n)
    {
        var result=[];

        var total=0;
        var averageData=[]; //平均值
        for(var i=n-1;i<data.length;++i)
        {
            total=0;
            for(var j=0;j<n;++j)
            {
                total+=data[i-j];
            }

            averageData[i]=total/n;
        }

        for(var i=n-1;i<data.length;++i)
        {
            total=0;
            for(var j=0;j<n;++j)
            {
                total+=Math.abs(data[i-j]-averageData[i]);
            }

            result[i]=total/n;
        }


        return result;
    }

    //上穿
    this.CROSS=function(data,data2)
    {
        var result=[];
        if (data.length!=data2.length) return result=[];

        var index=0;
        for(;index<data.length;++index)
        {
            if (this.IsNumber(data[index])  && this.IsNumber(data2[index]))
                break;
        }

        for(++index;index<data.length;++index)
        {
            result[index]= (data[index]>data2[index] && data[index-1]<data2[index-1]) ? 1:0;
        }

        return result;
    }

    //累乘
    this.MULAR=function(data,n)
    {
        var result=[];
        if(data.length<n) return result;

        var index=n;
        for(;index<data.length;++index)
        {
            if (data[index]!=null && !isNaN(data[index]))
            {
                result[index]=data[index];
                break;
            }
        }

        for(++index;index<data.length;++index)
        {
            result[index]=result[index-1]*data[index];
        }

        return result;
    }

    this.SUM=function(data,n)
    {
        var result=[];
        
        if (n==0)
        {
            result[0]=data[0];
    
            for (var i=1; i<data.length; ++i)
            {
                result[i] = result[i-1]+data[i];
            }
        }
        else
        {
            for(var i=n-1,j=0;i<data.length;++i,++j)
            {
                for(var k=0;k<n;++k)
                {
                    if (k==0) result[i]=data[k+j];
                    else result[i]+=data[k+j];
                }
            }
        }
    
        return result;
    }

    /*
        BARSCOUNT 有效数据周期数
        求总的周期数。
        用法：　BARSCOUNT(X)　第一个有效数据到当前的天数。
        例如：　BARSCOUNT(CLOSE)　对于日线数据取得上市以来总交易日数，对于分笔成交取得当日成交笔数，对于1分钟线取得当日交易分钟数。
    */
    this.BARSCOUNT=function(data)
    {
        let result=[];
        let days=null;
        for(let i in data)
        {
            result[i]=0;
            if (days==null)
            {
                if (!this.IsNumber(data[i])) contnue;

                days=0;
            }
                
            result[i]=days;
            ++days;
        }

        return result;
    }

    //DEVSQ 数据偏差平方和
    //DEVSQ(X，N) 　返回数据偏差平方和。
    this.DEVSQ=function(data,n)
    {

    }

    //NOT 取反
    //求逻辑非。
    //用法：　NOT(X)　返回非X，即当X=0时返回1，否则返回0。
    //例如：　NOT(ISUP)　表示平盘或收阴。
    this.NOT=function(data)
    {
        let isNumber=typeof(data)=='number';
        if (isNumber) return data? 0:1;

        let result=[];
        for(let i in data)
        {
            result[i]=null;
            if (this.IsNumber(data[i])) result[i]=data[i]?0:1;
        }

        return result;
    }

    //FORCAST 线性回归预测值
    //FORCAST(X，N)　 返回线性回归预测值。
    this.FORCAST=function(data,n)
    {

    }

    //SLOPE 线性回归斜率
    //SLOPE(X，N)　 返回线性回归斜率。
    this.SLOPE=function(data,n)
    {
        let result=[];
        if (typeof(n)!='number') n=parseInt(n); //字符串的转成数值型
        if (n<1 || !data.length) return result;
        if (n>=data.length) return result;

        let start=0;
        for(let i=0;i<data.length;++i,++start)
        {
            result[i]=null;
            if (this.IsNumber(data[i])) break;
        }

        let x,y,xy,xx;
        for(let i=start+n-1;i<data.length;++i)
        {
            result[i]=null;
            x=y=xy=xx=0;
            for(var j=0;j<n && j<=i; ++j)
            {
                x+=(i-j);       //数据索引相加
                y+=data[i-j];   //数据相加
            }

            x=x/n; y=y/n;
            for(j=0;j<n && j<=i; ++j)
            {
                xy+=(i-j-x)*(data[i-j]-y);
                xx+=(i-j-x)*(i-j-x);
            }

            if (xx) result[i]= xy/xx;
            else if (i) result[i]=result[i-1];
        }

        return result;
    }

    //STDP 总体标准差
    //STDP(X，N)　 返回总体标准差。
    this.STDP=function(data,n)
    {

    }

    //VAR 估算样本方差
    //VAR(X，N)　 返回估算样本方差。
    this.VAR=function(data,n)
    {

    }

    //VARP 总体样本方差
    //VARP(X，N)　 返回总体样本方差 。
    this.VARP=function(data,n)
    {

    }

    //RANGE(A,B,C)表示A>B AND A<C;
    this.RANGE=function(data,range,range2)
    {
        let isNumber=typeof(data)=='number';
        let isNumber2=typeof(range)=='number';
        let isNumber3=typeof(range2)=='number';

        if (isNumber && isNumber2 && isNumber3)
        {
            if (data>Math.min(range,range2) && data<Math.max(range,range2)) return 1;
            else return 0;
        }

        let result=[];
        let value, rangeValue,rangValue2;
        for(let i=0; i<data.length; ++i)
        {
            result[i]=null;
            value=data[i];
            if (!this.IsNumber(value)) continue;

            if (!isNumber2) 
            {
                if (i>=range.length) continue;

                rangeValue=range[i];
            }
            else 
            {
                rangeValue=range;
            }
            if (!this.IsNumber(rangeValue)) continue;

            if (!isNumber3) 
            {
                if (i>=range2.length) continue;

                rangeValue2=range2[i];
            }
            else 
            {
                rangeValue2=range2;
            }
            if (!this.IsNumber(rangeValue2)) continue;


            result[i]= (value>Math.min(rangeValue,rangeValue2) && value<Math.max(rangeValue,rangeValue2)) ? 1:0;
        }

        return result;
    }

    this.EXIST=function(data,n)
    {
        n=parseInt(n);

        if (typeof(data)=='number') return 0;

        var latestID; //最新满足条件的数据索引
        var result=[];
        var value;
        for(let i=0;i<data.length;++i)
        {
            result[i]=null;
            value=data[i];
            if (this.IsNumber(value) && value>0) latestID==i;

            if (i-latestID<n) result[i]=1;
            else result[i]=0;
        }

        return result;
    }

    this.TFILTER=function(data,data2,n)
    {
        n=parseInt(n);

        var result=[];

        let isNumber=typeof(data)=='number';
        let isNumber2=typeof(range)=='number';

        let count=Math.max(data.length, data2.length);
        for(let i=0;i<count;++i)
        {

        }


        return result;
    }

    this.BARSLAST=function(data)
    {
        var result=[];
        if (!data) return result;

        let day=null;
        for(let i=0;i<data.length;++i)
        {
            result[i]=null;

            if (data[i]>0)  day=0;
            else if (day!=null) ++day;

            if (day!=null) result[i]=day;
        }

        return result;
    }

    //函数调用
    this.CallFunction=function(name,args,node)
    {
        switch(name)
        {
            case 'MAX':
                return this.MAX(args[0], args[1]);
            case 'MIN':
                return this.MIN(args[0], args[1]);
            case 'REF':
                return this.REF(args[0], args[1]);
            case 'ABS':
                return this.ABS(args[0]);
            case 'MA':
                return this.MA(args[0], args[1]);
            case "EMA":
                return this.EMA(args[0], args[1]);
            case "SMA":
                return this.SMA(args[0], args[1],args[2]);
            case "DMA":
                return this.DMA(args[0], args[1]);
            case 'EXPMA':
                return this.EXPMA(args[0], args[1]);
            case 'EXPMEMA':
                return this.EXPMEMA(args[0], args[1]);
            case 'COUNT':
                return this.COUNT(args[0], args[1]);
            case 'LLV':
                return this.LLV(args[0], args[1]);
            case 'HHV':
                return this.HHV(args[0], args[1]);
            case 'MULAR':
                return this.MULAR(args[0], args[1]);
            case 'CROSS':
                return this.CROSS(args[0], args[1]);
            case 'AVEDEV':
                return this.AVEDEV(args[0], args[1]);
            case 'STD':
                return this.STD(args[0], args[1]);
            case 'IF':
            case 'IFF':
                return this.IF(args[0], args[1], args[2]);
            case 'NOT':
                return this.NOT(args[0]);
            case 'SUM':
                return this.SUM(args[0], args[1]);
            case 'RANGE':
                return this.RANGE(args[0],args[1],args[2]);
            case 'EXIST':
                return this.EXIST(args[0],args[1]);
            case 'TFILTER':
                return this.TFILTER(args[0],args[1],args[2]);
            case 'SLOPE':
                return this.SLOPE(args[0],args[1]);
            case 'BARSLAST':
                return this.BARSLAST(args[0]);
            case 'BARSCOUNT':
                return this.BARSCOUNT(args[0]);
            default:
                this.ThrowUnexpectedNode(node,'函数'+name+'不存在');
        }
    }

    this.ThrowUnexpectedNode=function(node,message)
    {
        let marker=node.Marker;
        let msg=message || "执行异常";
       
        return this.ErrorHandler.ThrowError(marker.Index,marker.Line,marker.Column,msg);
       
    }
}

//是否有是有效的数字
JSAlgorithm.prototype.IsNumber=function(value)
{
    if (value==null) return false;
    if (isNaN(value)) return false;

    return true;
}

//是否有是有效的除数
JSAlgorithm.prototype.IsDivideNumber=function(value)
{
    if (value==null) return false;
    if (isNaN(value)) return false;
    if (value==0) return false;

    return true;
}

/*
   绘图函数 
*/
function JSDraw(errorHandler)
{
    this.ErrorHandler=errorHandler;

    this.DRAWTEXT=function(condition,price,text)
    {
        let drawData=[];
        let result={DrawData:drawData, DrawType:'DRAWTEXT',Text:text};
        if (condition.length<=0) return result;

        var IsNumber=typeof(price)=="number";

        for(var i in condition)
        {
            drawData[i]=null;

            if (isNaN(condition[i]) || !condition[i]) continue;

            if (IsNumber) 
            {
                drawData[i]=price;
            }
            else 
            {
                if (isNaN(price[i])) drawData[i]=price[i];
            }
        }

        return result;
    }

    this.STICKLINE=function(condition,data,data2,width,type)
    {
        let drawData=[];
        let result={DrawData:drawData, DrawType:'STICKLINE',Width:width, Type:type};

        if(condition.length<=0) return result;

        var IsNumber=typeof(data)=="number";
        var IsNumber2=typeof(data2)=="number";
   
        for(var i in condition)
        {
            drawData[i]=null;

            if (isNaN(condition[i]) || !condition[i]) continue;

            if (IsNumber && IsNumber2)
            {
                drawData[i]={Value:data,Value2:data2};
            }
            else if (IsNumber && !IsNumber2)
            {
                if (isNaN(data2[i])) continue;
                drawData[i]={Value:data,Value2:data2[i]};
            }
            else if (!IsNumber && IsNumber2)
            {
                if (isNaN(data[i])) continue;
                drawData[i]={Value:data[i],Value2:data2};
            }
            else
            {
                if (isNaN(data[i]) || isNaN(data2[i])) continue;
                drawData[i]={Value:data[i],Value2:data2[i]};
            }
        }

        return result;
    }

    /*
    DRAWLINE 绘制直线段
    在图形上绘制直线段。
    用法：　DRAWLINE(COND1，PRICE1，COND2，PRICE2，EXPAND)
    当COND1条件满足时，在PRICE1位置画直线起点，当COND2条件满足时，在PRICE2位置画直线终点，EXPAND为延长类型。
    例如：　DRAWLINE(HIGH>=HHV(HIGH,20),HIGH,LOW<=LLV(LOW,20),LOW,1)　表示在创20天新高与创20天新低之间画直线并且向右延长。
    */
    this.DRAWLINE=function(condition,data,condition2,data2,expand)
    {
        let drawData=[];
        let result={DrawData:drawData, DrawType:'DRAWLINE', Expand:expand};

        if(condition.length<=0) return result;
        let count=Math.max(condition.length,condition2.length);

        let bFirstPoint=false;
        let bSecondPont=false;
        let lineCache={Start:{ },End:{ }, List:new Array()};

        for(let i=0;i<count;++i)
        {
            drawData[i]=null;
            if (i<condition.length && i<condition2.length)
            {
                if (bFirstPoint==false && bSecondPont==false)
                {
                    if (condition[i]==null || !condition[i]) continue;

                    bFirstPoint=true;
                    lineCache.Start={ID:i, Value:data[i]};  //第1个点
                }
                else if (bFirstPoint==true && bSecondPont==false)
                {
                    var bCondition=(condition[i]!=null &&condition[i]);     //条件1
                    var bCondition2=(condition2[i]!=null && condition2[i]); //条件2

                    if (!bCondition && !bCondition2) continue;

                    if(bCondition)
                    {
                        lineCache.Start={ID:i, Value:data[i]};  //移动第1个点
                    }
                    else if (bCondition2)
                    {
                        bSecondPont=true;
                        lineCache.End={ID:i, Value:data2[i]};   //第2个点
                    }
                }
                else if (bFirstPoint==true && bSecondPont==true)    //2个点都有了, 等待下一次的点出现
                {
                    var bCondition=(condition[i]!=null &&condition[i]);     //条件1
                    var bCondition2=(condition2[i]!=null && condition2[i]); //条件2

                    if(bCondition)
                    {
                        let lineData=this.CalculateDrawLine(lineCache);     //计算2个点的线上 其他点的数值

                        for(let j in lineData)
                        {
                            let item=lineData[j];
                            drawData[item.ID]=item.Value;
                        }

                        bFirstPoint=bSecondPont=false;
                        lineCache={Start:{ },End:{ }};
                    }
                    else if (bCondition2)
                    {
                        lineCache.End={ID:i, Value:data2[i]};   //移动第2个点
                    }
                }
            }
        }

        if (bFirstPoint==true && bSecondPont==true)     //最后一组数据
        {
            let lineData=this.CalculateDrawLine(lineCache);     
            for(let j in lineData)
            {
                let item=lineData[j];
                drawData[item.ID]=item.Value;
            }
        }

        return result;
    }

    /*
    画出带状线.
    用法: DRAWBAND(VAL1,COLOR1,VAL2,COLOR2),当VAL1>VAL2时,在VAL1和VAL2之间填充COLOR1;当VAL1<VAL2时,填充COLOR2,这里的颜色均使用RGB函数计算得到.
    例如: DRAWBAND(OPEN,RGB(0,224,224),CLOSE,RGB(255,96,96));
    */
    this.DRAWBAND=function(data,color,data2,color2)
    {
        let drawData=[];
        let result={DrawData:drawData, DrawType:'DRAWBAND', Color:[color,color2]};
        let count=Math.max(data.length, data2.length);

        for(let i=0;i<count;++i)
        {
            let item={Value:null, Value2:null};
            if (i<data.length) item.Value=data[i];
            if (i<data2.length) item.Value2=data2[i];

            drawData.push(item);
        }

        return result;
    }

    this.DRAWKLINE = function (high, open, low, close) 
    {
        let drawData = [];
        let result = { DrawData: drawData, DrawType: 'DRAWKLINE' };
        let count = Math.max(high.length, open.length, low.length, close.length);

        for (let i = 0; i < count; ++i) 
        {
            let item = { Open: null, High: null, Low: null, Close: null };

            if (i < high.length && i < open.length && i < low.length && i < close.length) 
            {
                item.Open = open[i];
                item.High = high[i];
                item.Low = low[i];
                item.Close = close[i];
            }

            drawData[i] = item;
        }

        return result;
    }

    /*
    PLOYLINE 折线段
    在图形上绘制折线段。
    用法：　PLOYLINE(COND，PRICE)，当COND条件满足时，以PRICE位置为顶点画折线连接。
    例如：　PLOYLINE(HIGH>=HHV(HIGH,20),HIGH)表示在创20天新高点之间画折线。
    */
    this.POLYLINE = function (condition, data) 
    {
        let drawData = [];
        let result = { DrawData: drawData, DrawType: 'POLYLINE' };
        let isNumber = typeof (data) == 'number';

        let bFirstPoint = false;
        let bSecondPont = false;
        if (isNumber) 
        {
            for (let i in condition) 
            {
                drawData[i] = null;
                if (bFirstPoint == false) 
                {
                    if (!condition[i]) continue;

                    drawData[i] = data;
                    bFirstPoint = true;
                }
                else {
                    drawData[i] = data;
                }
            }
        }
        else 
        {
            let lineCache = { Start: {}, End: {}, List: new Array() };
            for (let i in condition) 
            {
                drawData[i] = null;
                if (bFirstPoint == false && bSecondPont == false) 
                {
                    if (condition[i] == null || !condition[i]) continue;
                    if (i >= data.length || !this.IsNumber(data[i])) continue;

                    bFirstPoint = true;
                    lineCache.Start = { ID: parseInt(i), Value: data[i] };  //第1个点
                }
                else if (bFirstPoint == true && bSecondPont == false) 
                {
                    if (condition[i] == null || !condition[i]) continue;
                    if (i >= data.length || !this.IsNumber(data[i])) continue;

                    lineCache.End = { ID: parseInt(i), Value: data[i] };   //第2个点
                    //根据起始点和结束点 计算中间各个点的数据
                    let lineData = this.CalculateDrawLine(lineCache);     //计算2个点的线上 其他点的数值

                    for (let j in lineData) 
                    {
                        let item = lineData[j];
                        drawData[item.ID] = item.Value;
                    }

                    let start = { ID: lineCache.End.ID, Value: lineCache.End.Value };
                    lineCache = { Start: start, End: {} };
                }
            }
        }

        return result
    }

    /*
    画出数字.
    用法:
    DRAWNUMBER(COND,PRICE,NUMBER),当COND条件满足时,在PRICE位置书写数字NUMBER.
    例如:
    DRAWNUMBER(CLOSE/OPEN>1.08,LOW,C)表示当日实体阳线大于8%时在最低价位置显示收盘价.
    */
    this.DRAWNUMBER = function (condition, data, data2) 
    {
        let drawData = { Value: new Array(), Text: new Array() };
        let result = { DrawData: drawData, DrawType: 'DRAWNUMBER' };

        let isNumber = typeof (data2) == 'number';
        let text;
        if (isNumber) text=data2.toFixed(2);

        for (let i in condition) 
        {
            drawData.Value[i] = null;
            if (!condition[i]) continue;
            if (i >= data.length || !this.IsNumber(data[i])) continue;

            if (isNumber) 
            {
                drawData.Value[i] = data[i];
                drawData.Text[i] = text;
            }
            else 
            {
                if (i >= data2.length || !data2[i]) continue;
                drawData.Value[i] = data[i];
                if (typeof(data2[i])=='number')
                    drawData.Text[i] = data2[i].toFixed(2);
                else
                    drawData.Text[i] = data2[i].toString();
            }
        }

        return result;
    }
}


JSDraw.prototype.CalculateDrawLine=function(lineCache)
{
    lineCache.List=[];
    for(let i=lineCache.Start.ID; i<=lineCache.End.ID; ++i) lineCache.List.push(i);

    let height=Math.abs(lineCache.Start.Value-lineCache.End.Value);
    let width=lineCache.List.length-1;

    var result=[];
    result.push({ID:lineCache.Start.ID, Value:lineCache.Start.Value});  //第1个点

    if (lineCache.Start.Value>lineCache.End.Value)
    {
        for(let i=1;i<lineCache.List.length-1;++i)
        {
            var value=height*(lineCache.List.length-1-i)/width+lineCache.End.Value;
            result.push({ID:lineCache.List[i], Value:value});
        }
    }
    else
    {
        for(let i=1;i<lineCache.List.length-1;++i)
        {
            var value=height*i/width+lineCache.Start.Value;
            result.push({ID:lineCache.List[i], Value:value});
        }
    }

    result.push({ID:lineCache.End.ID, Value:lineCache.End.Value});      //最后一个点

    return result;
}

//是否有是有效的数字
JSDraw.prototype.IsNumber = function (value)
{
    if (value == null) return false;
    if (isNaN(value)) return false;

    return true;
}

JSDraw.prototype.IsDrawFunction=function(name)
{
    let setFunctionName = new Set(["STICKLINE", "DRAWTEXT", 'DRAWLINE', 'DRAWBAND', 'DRAWKLINE', 'PLOYLINE', 'POLYLINE','DRAWNUMBER']);
    if (setFunctionName.has(name)) return true;

    return false;
}

//http://www.newone.com.cn/helpcontroller/index?code=zszy_pc
var DYNAINFO_ARGUMENT_ID=
{
    YCLOSE:3,
    OPEN:4,
    HIGH:5,
    LOW:6,
    VOL:7,
    AMOUNT:8,
    AMPLITUDE:13,   //振幅
    INCREASE:14,    //涨幅
    EXCHANGERATE:37,    //换手率
};

function JSSymbolData(ast,option,jsExecute)
{
    this.AST=ast;               //语法树
    this.Execute=jsExecute;

    this.Symbol='600000.sh';
    this.Name;
    this.Data=null;             //个股数据
    this.Period=0;              //周期
    this.Right=0;               //复权

    this.KLineApiUrl = g_JSComplierResource.Domain+"/API/KLine2";                   //日线
    this.MinuteKLineApiUrl = g_JSComplierResource.Domain +'/API/KLine3';             //分钟K线
    this.RealtimeApiUrl = g_JSComplierResource.Domain +'/API/stock';                 //实时行情
    this.StockHistoryDayApiUrl = g_JSComplierResource.Domain +'/API/StockHistoryDay';  //历史财务数据
    this.StockHistoryDay3ApiUrl = g_JSComplierResource.Domain +'/API/StockHistoryDay3';  //历史财务数据
    this.MaxReqeustDataCount=1000;
    this.MaxRequestMinuteDayCount=5;

    this.LatestData;            //最新行情
    this.IndexData;             //大盘指数
    this.FinanceData=new Map(); //财务数据
    
   
    //使用option初始化
    if (option)
    {
        if (option.Data) 
        {
            this.Data=option.Data;
            this.Period=option.Data.Period; //周期
            this.Right=option.Data.Right;   //复权
            //this.Data=null;
        }

        if (option.Symbol) this.Symbol=option.Symbol;
        if (option.Symbol) this.Symbol = option.Symbol;
        if (option.MaxReqeustDataCount>0) this.MaxReqeustDataCount=option.MaxReqeustDataCount;
        if (option.MaxRequestMinuteDayCount>0) this.MaxRequestMinuteDayCount=option.MaxRequestMinuteDayCount;
        if (option.KLineApiUrl) this.KLineApiUrl=option.KLineApiUrl;
    }

    //最新行情
    this.GetLatestData=function()
    {
        if (this.LatestData) return this.Execute.RunNextJob();

        var self=this;
        wx.request({
            url: self.RealtimeApiUrl,
            data:
            {
                "field": ["name","symbol","yclose","open","price","high","low","vol","amount","date","time","increase","exchangerate","amplitude"],
                "symbol": [this.Symbol]
            },
            method:"POST",
            dataType: "json",
            success: function (recvData)
            {
                self.RecvLatestData(recvData);
                self.Execute.RunNextJob();
            },
            error: function(request)
            {
                self.RecvError(request);
            }
        });
    }

    this.RecvLatestData = function (recvData)
    {
        let data=recvData.data;
        if (!data.stock || data.stock.length!=1) return;

        let stock=data.stock[0];
        this.LatestData={ Symbol:stock.symbol, Name:stock.name, Date:stock.date, Time:stock.time,
            YClose:stock.yclose,Price:stock.price, Open:stock.open, High:stock.high, Low:stock.low, Vol:stock.vol, Amount:stock.amount, 
            Increase:stock.increase, Exchangerate:stock.exchangerate, Amplitude:stock.amplitude};

        console.log('[JSSymbolData::RecvLatestData]', this.LatestData);
    }

    this.GetLatestCacheData=function(dataname)
    {
        if (!this.LatestData) return  null;

        switch(dataname)
        {
            case DYNAINFO_ARGUMENT_ID.YCLOSE:
                return this.LatestData.YClose;
            case DYNAINFO_ARGUMENT_ID.OPEN:
                return this.LatestData.Open;
            case DYNAINFO_ARGUMENT_ID.HIGH:
                return this.LatestData.High;
            case DYNAINFO_ARGUMENT_ID.LOW:
                return this.LatestData.Low;
            case DYNAINFO_ARGUMENT_ID.VOL:
                return this.LatestData.Vol;
            case DYNAINFO_ARGUMENT_ID.AMOUNT:
                return this.LatestData.Amount;
            case DYNAINFO_ARGUMENT_ID.INCREASE:
                return this.LatestData.Increase;
            case DYNAINFO_ARGUMENT_ID.EXCHANGERATE:
                return this.LatestData.Exchangerate;
            case DYNAINFO_ARGUMENT_ID.AMPLITUDE:
                return this.LatestData.Amplitude;
            default:
                return null;
        }
    }

    //获取大盘指数数据
    this.GetIndexData=function()
    {
        if (this.IndexData) return this.Execute.RunNextJob();

        var self=this;
        if (this.Period<=3)     //请求日线数据
        {
            wx.request({
                url: self.KLineApiUrl,
                data:
                {
                    "field": [ "name", "symbol","yclose","open","price","high","low","vol"],
                    "symbol": '000001.sh',
                    "start": -1,
                    "count": self.MaxReqeustDataCount+500   //多请求2年的数据 确保股票剔除停牌日期以后可以对上
                },
                method: 'POST',
                dataType: "json",
                success: function (recvData)
                {
                    self.RecvIndexHistroyData(recvData);
                    self.Execute.RunNextJob();
                },
                error: function(request)
                {
                    self.RecvError(request);
                }
            });
        }
        else            //请求分钟数据
        {
            wx.request({
                url: self.MinuteKLineApiUrl,
                data:
                {
                    "field": ["name","symbol","yclose","open","price","high","low","vol"],
                    "symbol": '000001.sh',
                    "start": -1,
                    "count": self.MaxRequestMinuteDayCount+5
                },
                method: 'POST',
                dataType: "json",
                success: function (data)
                {
                    self.RecvIndexMinuteHistroyData(data);
                    self.Execute.RunNextJob();
                },
                error: function(request)
                {
                    self.RecvError(request);
                }
            });
        }

    }

    this.RecvIndexHistroyData=function(recvData)
    {
        let data = recvData.data;
        console.log('[JSSymbolData::RecvIndexHistroyData] recv data' , data);

        let hisData=this.JsonDataToHistoryData(data);
        this.IndexData = new JSCommonData.ChartData();
        this.IndexData.DataType=0; /*日线数据 */
        this.IndexData.Data=hisData;

        var aryOverlayData=this.Data.GetOverlayData(this.IndexData.Data);      //和主图数据拟合以后的数据
        this.IndexData.Data=aryOverlayData;

        if (this.Period>0 && this.Period<=3)   //周期数据
        {
            let periodData=this.IndexData.GetPeriodData(this.Period);
            this.Data.Data=periodData;
        }
    }

    this.RecvIndexMinuteHistroyData = function (recvData)
    {
        let data = recvData.data;
        console.log('[JSSymbolData::RecvIndexMinuteHistroyData] recv data' , data);

        let hisData=this.JsonDataToMinuteHistoryData(data);
        this.IndexData = new JSCommonData.ChartData();
        this.IndexData.DataType=1; /*分钟线数据 */
        this.IndexData.Data=hisData;

        if (this.Period>=5)   //周期数据
        {
            let periodData=this.IndexData.GetPeriodData(this.Period);
            this.IndexData.Data=periodData;
        }
    }

    //获取大盘指数缓存数据
    this.GetIndexCacheData=function(dataName)
    {
        if (!this.IndexData) return  new Array();

        switch(dataName)
        {
        case 'INDEXA':
            return this.IndexData.GetAmount();
        case 'INDEXC':
            return this.IndexData.GetClose();
        case 'INDEXH':
            return this.IndexData.GetHigh();
        case 'INDEXL':
            return this.IndexData.GetLow();
        case 'INDEXO':
            return this.IndexData.GetOpen();
        case 'INDEXV':
            return this.IndexData.GetVol();
        }
    }

    this.GetSymbolData=function()
    {
        if (this.Data) return this.Execute.RunNextJob();
           
        let self=this;

        if (this.Period<=3)     //请求日线数据
        {
            wx.request({
                url: self.KLineApiUrl,
                data:
                {
                    "field": [ "name", "symbol","yclose","open","price","high","low","vol"],
                    "symbol": self.Symbol,
                    "start": -1,
                    "count": self.MaxReqeustDataCount
                },
                method: 'POST',
                dataType: "json",
                async:true, 
                success: function (recvData)
                {
                    self.RecvHistroyData(recvData);
                    self.Execute.RunNextJob();
                },
                error: function(request)
                {
                    self.RecvError(request);
                }
            });
        }
        else                //请求分钟数据
        {
            wx.request({
                url: this.MinuteKLineApiUrl,
                data:
                {
                    "field": ["name","symbol","yclose","open","price","high","low","vol"],
                    "symbol": self.Symbol,
                    "start": -1,
                    "count": self.MaxRequestMinuteDayCount
                },
                method: 'POST',
                dataType: "json",
                async:true,
                success: function (data)
                {
                    self.RecvMinuteHistroyData(data);
                    self.Execute.RunNextJob();
                },
                error: function(request)
                {
                    self.RecvError(request);
                }
            });
        }
    }

    this.RecvHistroyData=function(recvData)
    {
        let data=recvData.data;
        console.log('[JSSymbolData::RecvHistroyData] recv data' , data);

        let hisData=this.JsonDataToHistoryData(data);
        this.Data=new JSCommonData.ChartData();
        this.Data.DataType=0; /*日线数据 */
        this.Data.Data=hisData;

        if (this.Right>0)    //复权
        {
            let rightData=this.Data.GetRightDate(this.Right);
            this.Data.Data=rightData;
        }

        if (this.Period>0 && this.Period<=3)   //周期数据
        {
            let periodData=this.Data.GetPeriodData(this.Period);
            this.Data.Data=periodData;
        }

        this.Name = data.name;
    }

    this.RecvMinuteHistroyData = function (recvData)
    {
        let data = recvData.data;
        console.log('[JSSymbolData::RecvMinuteHistroyData] recv data' , data);

        let hisData=this.JsonDataToMinuteHistoryData(data);
        this.Data = new JSCommonData.ChartData();
        this.Data.DataType=1; /*分钟线数据 */
        this.Data.Data=hisData;

        if (this.Period>=5)   //周期数据
        {
            let periodData=this.Data.GetPeriodData(this.Period);
            this.Data.Data=periodData;
        }

        this.Name = data.name;
    }

    this.GetSymbolCacheData=function(dataName)
    {
        if (!this.Data) return new Array();

        switch(dataName)
        {
            case 'CLOSE':
            case 'C':
                return this.Data.GetClose();
            case 'VOL':
            case 'V':
                return this.Data.GetVol();
            case 'OPEN':
            case 'O':
                return this.Data.GetOpen();
            case 'HIGH':
            case 'H':
                return this.Data.GetHigh();
            case 'LOW':
            case 'L':
                return this.Data.GetLow();
            case 'AMOUNT':
                return this.Data.GetAmount();
        }
    }

    this.GetCurrBarsCount=function()
    {
        if (!this.Data || !this.Data.Data || !this.Data.Data.length) return new Array();

        let lCount=this.Data.Data.length;
        let result=[];
        for(let i=lCount-1;i>=0;--i)
            result.push(i);

        return result;
    }

    //财务函数
    this.GetFinanceCacheData=function(id, node)
    {
        let jobID=JS_EXECUTE_JOB_ID.GetFinnanceJobID(id);
        if (!jobID) this.Execute.ThrowUnexpectedNode(node,'不支持FINANCE('+id+')');
        if(this.FinanceData.has(jobID)) return this.FinanceData.get(jobID);

        return [];
    }

    //下载财务数据
    this.GetFinanceData=function(jobID)
    {
        if (this.FinanceData.has(jobID)) return this.Execute.RunNextJob();

        console.log('[JSSymbolData::GetFinanceData] jobID=', jobID);
        var self=this;
        let fieldList=["name","date","symbol"];
        
        switch(jobID)
        {
            case JS_EXECUTE_JOB_ID.JOB_DOWNLOAD_FLOW_EQUITY_DATA:   //流通股本（万股）
            case JS_EXECUTE_JOB_ID.JOB_DOWNLOAD_CAPITAL_DATA:       //流通股本（手）
                fieldList.push("folwequity");
                break;
            case JS_EXECUTE_JOB_ID.JOB_DOWNLOAD_TOTAL_EQUITY_DATA:  //总股本（万股）
                fieldList.push('totalequity');
                break;
        }

         //请求数据
        wx.request({
            url: this.StockHistoryDayApiUrl,
            data:
            {
                "field": fieldList,
                "symbol": [this.Symbol],
            },
            method: 'POST',
            dataType: "json",
            async:true,
            success: function (recvData)
            {
                self.RecvFinanceData(recvData,jobID);
                self.Execute.RunNextJob();
            }
        });
    }

    this.RecvFinanceData=function(recvData,jobID)
    {
        switch(jobID)
        {
            case JS_EXECUTE_JOB_ID.JOB_DOWNLOAD_FLOW_EQUITY_DATA:
            case JS_EXECUTE_JOB_ID.JOB_DOWNLOAD_CAPITAL_DATA:
            case JS_EXECUTE_JOB_ID.JOB_DOWNLOAD_TOTAL_EQUITY_DATA:
                return this.RecvStockDayData(recvData,jobID);
        }
    }

    this.RecvStockDayData=function(recvData,jobID)
    {
        let data=recvData.data;
        console.log(data);
        if (!data.stock || data.stock.length!=1) return;

        let stock = data.stock[0];
        var aryData=new Array();
        for(let i in stock.stockday)
        {
            var item=stock.stockday[i];
            let indexData=new JSCommonData.SingleData();
            indexData.Date=item.date;

            if (jobID==JS_EXECUTE_JOB_ID.JOB_DOWNLOAD_CAPITAL_DATA) 
                indexData.Value=item.folwequity/100;    //流通股本（手）
            else if (jobID==JS_EXECUTE_JOB_ID.JOB_DOWNLOAD_TOTAL_EQUITY_DATA) 
                indexData.Value=item.totalequity/10000; //总股本（万股）
            else 
                indexData.Value=item.folwequity/10000; //流通股本（万股）

            aryData.push(indexData);
        }

        let aryFixedData=this.Data.GetFittingData(aryData);
        var bindData = new JSCommonData.ChartData();
        bindData.Data=aryFixedData;
        bindData.Period=this.Period;    //周期

        if (bindData.Period>0)          //周期数据
        {
            var periodData=bindData.GetPeriodSingleData(bindData.Period);
            bindData.Data=periodData;
        }

        let stockData=bindData.GetValue();
        this.FinanceData.set(jobID, stockData);
    }

   
    this.JsonDataToHistoryData=function(data)
    {
        var list = data.data;
        var aryDayData=new Array();
        var date = 0, yclose = 1, open = 2, high = 3, low = 4, close = 5, vol = 6, amount = 7;
        for (var i = 0; i < list.length; ++i)
        {
            var item = new JSCommonData.HistoryData();

            item.Date = list[i][date];
            item.Open = list[i][open];
            item.YClose = list[i][yclose];
            item.Close = list[i][close];
            item.High = list[i][high];
            item.Low = list[i][low];
            item.Vol = list[i][vol]/100;    //原始单位股
            item.Amount = list[i][amount];

            if (isNaN(item.Open) || item.Open<=0) continue; //停牌的数据剔除

            aryDayData.push(item);
        }

        return aryDayData;
    }

    this.JsonDataToMinuteHistoryData=function(data)
    {
        var list = data.data;
        var aryDayData=new Array();
        var date = 0, yclose = 1, open = 2, high = 3, low = 4, close = 5, vol = 6, amount = 7, time = 8;
        for (var i = 0; i < list.length; ++i)
        {
            let item = new JSCommonData.HistoryData();

            item.Date = list[i][date];
            item.Open = list[i][open];
            item.YClose = list[i][yclose];
            item.Close = list[i][close];
            item.High = list[i][high];
            item.Low = list[i][low];
            item.Vol = list[i][vol]/100;    //原始单位股
            item.Amount = list[i][amount];
            item.Time=list[i][time];

        // if (isNaN(item.Open) || item.Open<=0) continue; //停牌的数据剔除
            aryDayData.push(item);
        }

        // 无效数据处理
        for(let i = 0; i < aryDayData.length; ++i)
        {
            var minData = aryDayData[i];
            if (minData == null) coninue;
            if (isNaN(minData.Open) || minData.Open <= 0 || isNaN(minData.High) || minData.High <= 0 || isNaN(minData.Low) || minData.Low <= 0 
                || isNaN(minData.Close) || minData.Close <= 0 || isNaN(minData.YClose) || minData.YClose <= 0)
            {
                if (i == 0)
                {
                    if (minData.YClose > 0)
                    {
                        minData.Open = minData.YClose;
                        minData.High = minData.YClose;
                        minData.Low = minData.YClose;
                        minData.Close = minData.YClose;
                    }
                }
                else // 用前一个有效数据填充
                {
                    for(let j = i-1; j >= 0; --j)
                    {
                        var minData2 = aryDayData[j];
                        if (minData2 == null) coninue;
                        if (minData2.Open > 0 && minData2.High > 0 && minData2.Low > 0 && minData2.Close > 0)
                        {
                            if (minData.YClose <= 0) minData.YClose = minData2.Close;
                            minData.Open = minData2.Open;
                            minData.High = minData2.High;
                            minData.Low = minData2.Low;
                            minData.Close = minData2.Close;
                            break;
                        }
                    }
                }    
            }
        }
        return aryDayData;
    }

    //CODELIKE 模糊股票代码
    this.CODELIKE=function(value)
    {
        if (this.Symbol.indexOf(value)==0) return 1;

        return 0;
    }

    this.NAMELIKE = function (value) 
    {
        if (this.Name && this.Name.indexOf(value) == 0) return 1;
        return 0;
    }

    /*
    SETCODE 市场类型
    0:深圳 1:上海,47:中金所期货 28:郑州商品 29:大连商品 30:上海商品,27:香港指数 31:香港主板,48:香港创业板... 
    */
   this.SETCODE=function()
   {
       if (this.Symbol.indexOf('.sh')) return 1;
       if (this.Symbol.indexOf('.sz')) return 0;

       return 0;
   }
}

var JS_EXECUTE_DEBUG_LOG=false;

var JS_EXECUTE_JOB_ID=
{
    JOB_DOWNLOAD_SYMBOL_DATA:1, //下载股票的K线数据
    JOB_DOWNLOAD_INDEX_DATA:2,  //下载大盘的K线数据
    JOB_DOWNLOAD_SYMBOL_LATEST_DATA:3,  //最新的股票行情数据

    //财务函数
    JOB_DOWNLOAD_TOTAL_EQUITY_DATA:100,          //总股本（万股）
    JOB_DOWNLOAD_FLOW_EQUITY_DATA:101,           //流通股本（万股）
    JOB_DOWNLOAD_CAPITAL_DATA:200,               //流通股本（手）

    JOB_RUN_SCRIPT:1000, //执行脚本

    GetFinnanceJobID:function(value)
    {
        let dataMap=new Map([
            [1,JS_EXECUTE_JOB_ID.JOB_DOWNLOAD_TOTAL_EQUITY_DATA],
            [7,JS_EXECUTE_JOB_ID.JOB_DOWNLOAD_FLOW_EQUITY_DATA],
            [200,JS_EXECUTE_JOB_ID.JOB_DOWNLOAD_CAPITAL_DATA]
        ]);
    
        if (dataMap.has(value)) return dataMap.get(value);
    
        return null;
    }

};

function JSExecute(ast,option)
{
    this.AST=ast;   //语法树

    this.ErrorHandler=new ErrorHandler();
    this.Algorithm=new JSAlgorithm(this.ErrorHandler);
    this.Draw=new JSDraw(this.ErrorHandler);

    this.VarTable=new Map();        //变量表
    this.OutVarTable=new Array();   //输出变量
    this.Arguments=[];

    //脚本自动变量表, 只读
    this.ConstVarTable=new Map([
        //个股数据
        ['CLOSE',null],['VOL',null],['OPEN',null],['HIGH',null],['LOW',null],['AMOUNT',null],
        ['C',null],['V',null],['O',null],['H',null],['L',null],

        //大盘数据
        ['INDEXA',null],['INDEXC',null],['INDEXH',null],['INDEXL',null],['INDEXO',null],['INDEXV',null],

        //到最后交易日的周期数
        ['CURRBARSCOUNT',null],
        //流通股本（手）
        ['CAPITAL',null],
        ['SETCODE', null]    
    ]);   

    this.SymbolData=new JSSymbolData(this.AST,option,this);
    this.JobList=[];    //执行的任务队列

    this.UpdateUICallback=null; //回调
    this.CallbackParam=null;

    if (option)
    {
        if (option.Callback) this.UpdateUICallback=option.Callback;
        if (option.CallbackParam) this.CallbackParam=option.CallbackParam;
        if (option.Arguments) this.Arguments=option.Arguments;
    }

    this.Execute=function()
    {
        console.log('[JSExecute::Execute] JobList', this.JobList);
        this.RunNextJob();
    }

    this.RunNextJob=function()
    {
        if (this.JobList.length<=0) return;

        var jobName=this.JobList.shift();

        switch(jobName)
        {
            case JS_EXECUTE_JOB_ID.JOB_DOWNLOAD_SYMBOL_DATA:
                return this.SymbolData.GetSymbolData();
            case JS_EXECUTE_JOB_ID.JOB_DOWNLOAD_INDEX_DATA:
                return this.SymbolData.GetIndexData();
            case JS_EXECUTE_JOB_ID.JOB_DOWNLOAD_SYMBOL_LATEST_DATA:
                return this.SymbolData.GetLatestData();

            case JS_EXECUTE_JOB_ID.JOB_DOWNLOAD_TOTAL_EQUITY_DATA:
            case JS_EXECUTE_JOB_ID.JOB_DOWNLOAD_CAPITAL_DATA:
            case JS_EXECUTE_JOB_ID.JOB_DOWNLOAD_FLOW_EQUITY_DATA:
                return this.SymbolData.GetFinanceData(jobName);

            case JS_EXECUTE_JOB_ID.JOB_RUN_SCRIPT:
                return this.Run();
        }
    }

    this.ReadSymbolData=function(name)
    {
        switch(name)
        {
            case 'CLOSE':
            case 'C':
            case 'VOL':
            case 'V':
            case 'OPEN':
            case 'O':
            case 'HIGH':
            case 'H':
            case 'LOW':
            case 'L':
            case 'AMOUNT':
                return this.SymbolData.GetSymbolCacheData(name);

            //大盘数据
            case 'INDEXA':
            case 'INDEXC':
            case 'INDEXH':
            case 'INDEXH':
            case 'INDEXO':
            case 'INDEXV':
                return this.SymbolData.GetIndexCacheData(name);

            case 'CURRBARSCOUNT':
                return this.SymbolData.GetCurrBarsCount();
            case 'CAPITAL':
                return this.SymbolData.GetFinanceCacheData(JS_EXECUTE_JOB_ID.JOB_DOWNLOAD_CAPITAL_DATA);
            case 'SETCODE':
                return this.SymbolData.SETCODE();
        }
    }

    //读取变量
    this.ReadVariable=function(name,node)
    {
        if (this.ConstVarTable.has(name)) 
        {
            let data=this.ConstVarTable.get(name);

            if (data==null) //动态加载,用到再加载
            {
                data=this.ReadSymbolData(name);
                this.ConstVarTable.set(name,data);
            }

            return data;
        }

        if (this.VarTable.has(name)) return this.VarTable.get(name);

        this.ThrowUnexpectedNode(node, '变量'+name+'不存在');
        return null;
    }

    //单数据转成数组 个数和历史数据一致
    this.SingleDataToArrayData = function (value) 
    {
        let count = this.SymbolData.Data.Data.length;
        let result = [];
        for (let i = 0; i < count; ++i) 
        {
            result[i] = value;
        }

        return result;
    }

    this.RunAST=function()
    {
        //预定义的变量
        for(let i in this.Arguments)
        {
            let item =this.Arguments[i];
            this.VarTable.set(item.Name,item.Value);
        }

        if (!this.AST) this.ThrowError();
        if (!this.AST.Body) this.ThrowError();

        for(let i in this.AST.Body)
        {
            let item =this.AST.Body[i];
            this.VisitNode(item);

            //输出变量
            if (item.Type==Syntax.ExpressionStatement && item.Expression)
            {
                if (item.Expression.Type==Syntax.AssignmentExpression && item.Expression.Operator==':' && item.Expression.Left)
                {
                    let assignmentItem=item.Expression;
                    let varName=assignmentItem.Left.Name;
                    let outVar=this.VarTable.get(varName);
                    if (!Array.isArray(outVar)) outVar = this.SingleDataToArrayData(outVar);

                    this.OutVarTable.push({Name:varName, Data:outVar,Type:0});
                }
                else if (item.Expression.Type==Syntax.CallExpression)
                {
                    let callItem=item.Expression;
                    if (this.Draw.IsDrawFunction(callItem.Callee.Name))
                    {
                        let draw=callItem.Draw;
                        draw.Name=callItem.Callee.Name;
                        this.OutVarTable.push({Name:draw.Name, Draw:draw, Type:1});
                    }
                }
                else if (item.Expression.Type==Syntax.SequenceExpression)
                {
                    let varName;
                    let draw;
                    let color;
                    let lineWidth;
                    let colorStick=false;
                    let pointDot=false;
                    let circleDot=false;
                    let lineStick=false;
                    let stick=false;
                    let volStick=false;
                    for(let j in item.Expression.Expression)
                    {
                        let itemExpression=item.Expression.Expression[j];
                        if (itemExpression.Type==Syntax.AssignmentExpression && itemExpression.Operator==':' && itemExpression.Left)
                        {
                            varName = itemExpression.Left.Name;
                            let varValue = this.VarTable.get(varName);
                            if (!Array.isArray(varValue)) 
                            {
                                varValue = this.SingleDataToArrayData(varValue);
                                this.VarTable.set(varName, varValue);            //把常量放到变量表里
                            } 
                        }
                        else if (itemExpression.Type==Syntax.Identifier)
                        {
                            let value=itemExpression.Name;
                            if (value==='COLORSTICK') colorStick=true;
                            else if (value==='POINTDOT') pointDot=true;
                            else if (value==='CIRCLEDOT') circleDot=true;
                            else if (value==='LINESTICK') lineStick=true;
                            else if (value==='STICK') stick=true;
                            else if (value==='VOLSTICK') volStick=true;
                            else if (value.indexOf('COLOR')==0) color=value;
                            else if (value.indexOf('LINETHICK')==0) lineWidth=value;
                        }
                        else if (itemExpression.Type == Syntax.Literal)    //常量
                        {
                            let aryValue = this.SingleDataToArrayData(itemExpression.Value);
                            varName = itemExpression.Value.toString();
                            this.VarTable.set(varName, aryValue);    //把常量放到变量表里
                        }
                        else if (itemExpression.Type==Syntax.CallExpression && this.Draw.IsDrawFunction(itemExpression.Callee.Name))
                        {
                            draw=itemExpression.Draw;
                            draw.Name=itemExpression.Callee.Name;
                        }
                    }

                    if (pointDot && varName)   //圆点
                    {
                        let outVar=this.VarTable.get(varName);
                        let value={Name:varName, Data:outVar, Radius:2, Type:3};
                        if (color) value.Color=color;
                        this.OutVarTable.push(value);
                    }
                    else if (circleDot && varName)  //圆点
                    {
                        let outVar=this.VarTable.get(varName);
                        let value={Name:varName, Data:outVar, Radius:1.3, Type:3};
                        if (color) value.Color=color;
                        this.OutVarTable.push(value);
                    }
                    else if (lineStick && varName)  //LINESTICK  同时画出柱状线和指标线
                    {
                        let outVar=this.VarTable.get(varName);
                        let value={Name:varName, Data:outVar, Type:4};
                        if (color) value.Color=color;
                        if (lineWidth) value.LineWidth=lineWidth;
                        this.OutVarTable.push(value);
                    }
                    else if (stick && varName)  //STICK 画柱状线
                    {
                        let outVar=this.VarTable.get(varName);
                        let value={Name:varName, Data:outVar, Type:5};
                        if (color) value.Color=color;
                        if (lineWidth) value.LineWidth=lineWidth;
                        this.OutVarTable.push(value);
                    }
                    else if (volStick && varName)   //VOLSTICK   画彩色柱状线
                    {
                        let outVar=this.VarTable.get(varName);
                        let value={Name:varName, Data:outVar, Type:6};
                        if (color) value.Color=color;
                        this.OutVarTable.push(value);
                    }
                    else if (varName && color) 
                    {
                        let outVar=this.VarTable.get(varName);
                        let value={Name:varName, Data:outVar, Color:color, Type:0};
                        if (lineWidth) value.LineWidth=lineWidth;
                        this.OutVarTable.push(value);
                    }
                    else if (draw && color)
                    {
                        this.OutVarTable.push({Name:draw.Name, Draw:draw, Color:color, Type:1});
                    }
                    else if (colorStick && varName)  //CYW: SUM(VAR4,10)/10000, COLORSTICK; 画上下柱子
                    {
                        let outVar=this.VarTable.get(varName);
                        let value={Name:varName, Data:outVar, Color:color, Type:2};
                        this.OutVarTable.push(value);
                    }
                    else if (varName) 
                    {
                        let outVar = this.VarTable.get(varName);
                        let value = { Name: varName, Data: outVar, Type: 0 };
                        if (color) value.Color = color;
                        if (lineWidth) value.LineWidth = lineWidth;
                        this.OutVarTable.push(value);
                    }
                }
            }
        }

        console.log('[JSExecute::Run]', this.VarTable);

        return this.OutVarTable;
    }

    this.Run=function()
    {                        
        let data=this.RunAST();//执行脚本
        console.log('[JSComplier.Run] execute finish', data);
        
        if (this.UpdateUICallback) 
        {
            console.log('[JSComplier.Run] invoke UpdateUICallback.');
            this.UpdateUICallback(data,this.CallbackParam);
        }
    }

    this.VisitNode=function(node)
    {
        switch(node.Type)
        {
            case Syntax.SequenceExpression:
                this.VisitSequenceExpression(node);
                break;
            case Syntax.ExpressionStatement:
                this.VisitNode(node.Expression);
                break;
            case Syntax.AssignmentExpression:
                this.VisitAssignmentExpression(node);
                break;
            case Syntax.BinaryExpression:
            case Syntax.LogicalExpression:
                this.VisitBinaryExpression(node);
                break;
            case Syntax.CallExpression:
                this.VisitCallExpression(node);
                break;
        }
    }

    this.VisitSequenceExpression=function(node)
    {
        for(let i in node.Expression)
        {
            let item =node.Expression[i];
            this.VisitNode(item);
        }
    }

    //函数调用
    this.VisitCallExpression=function(node)
    {
        let funcName=node.Callee.Name;
        let args=[];
        for(let i in node.Arguments)
        {
            let item=node.Arguments[i];
            let value;
            if (item.Type==Syntax.BinaryExpression || item.Type==Syntax.LogicalExpression) 
                value=this.VisitBinaryExpression(item);
            else if (item.Type==Syntax.CallExpression)
                value=this.VisitCallExpression(item);
            else
                value=this.GetNodeValue(item);
            args.push(value);
        }

        if (JS_EXECUTE_DEBUG_LOG) console.log('[JSExecute::VisitCallExpression]' , funcName, '(', args.toString() ,')');

        switch(funcName)
        {
            case 'DYNAINFO':    //行情最新数据
                node.Out=this.SymbolData.GetLatestCacheData(args[0]);
                break;
            case 'STICKLINE':
                node.Draw=this.Draw.STICKLINE(args[0],args[1],args[2],args[3],args[4]);
                node.Out=[];
                break;
            case 'DRAWTEXT':
                node.Draw=this.Draw.DRAWTEXT(args[0],args[1],args[2]);
                node.Out=[];
                break;
            case 'DRAWLINE':
                node.Draw=this.Draw.DRAWLINE(args[0],args[1],args[2],args[3],args[4]);
                node.Out=node.Draw.DrawData;
                break;
            case 'DRAWBAND':
                node.Draw=this.Draw.DRAWBAND(args[0],args[1],args[2],args[3]);
                node.Out=[];
                break;
            case 'DRAWKLINE':
                node.Draw = this.Draw.DRAWKLINE(args[0], args[1], args[2], args[3]);
                node.Out = [];
                break;
            case 'PLOYLINE':
            case 'POLYLINE':
                node.Draw = this.Draw.POLYLINE(args[0], args[1]);
                node.Out = node.Draw.DrawData;
                break;
            case 'DRAWNUMBER':
                node.Draw = this.Draw.DRAWNUMBER(args[0], args[1], args[2]);
                node.Out = node.Draw.DrawData.Value;
                break;
            case 'CODELIKE':
                node.Out=this.SymbolData.CODELIKE(args[0]);
                break;
            case 'NAMELIKE':
                node.Out = this.SymbolData.NAMELIKE(args[1]);
                break;
            case 'FINANCE':
                node.Out=this.SymbolData.GetFinanceCacheData(args[0],node);
                break;
            default:
                node.Out=this.Algorithm.CallFunction(funcName, args,node);
                break;
        }

        return node.Out;
    }

    //赋值
    this.VisitAssignmentExpression=function(node)
    {
        let left=node.Left;
        if (left.Type!=Syntax.Identifier) this.ThrowUnexpectedNode(node);

        let varName=left.Name;

        let right=node.Right;
        let value=null;
        if (right.Type==Syntax.BinaryExpression || right.Type==Syntax.LogicalExpression)
            value=this.VisitBinaryExpression(right);
        else if (right.Type==Syntax.CallExpression)
            value=this.VisitCallExpression(right);
        else if (right.Type==Syntax.Literal)
            value=right.Value;
        else if (right.Type==Syntax.Identifier) //右值是变量
            value=this.ReadVariable(right.Name,right);

        if (JS_EXECUTE_DEBUG_LOG) console.log('[JSExecute::VisitAssignmentExpression]' , varName, ' = ',value);
        this.VarTable.set(varName,value);
    }

    //逻辑运算
    this.VisitBinaryExpression=function(node)
    {
        let stack=[];
        stack.push(node);
        let temp=null;

        while(stack.length!=0)
        {
            temp=stack[stack.length-1];
            if (temp.Left && node!=temp.Left && node!=temp.Right)
            {
                stack.push(temp.Left);
            }
            else if (temp.Right && node!=temp.Right)
            {
                stack.push(temp.Right);
            }
            else
            {
                let value=stack.pop();
                if (value.Type==Syntax.BinaryExpression)    //只遍历操作符就可以
                {
                    let leftValue=this.GetNodeValue(value.Left);
                    let rightValue=this.GetNodeValue(value.Right);

                    if (JS_EXECUTE_DEBUG_LOG) console.log('[JSExecute::VisitBinaryExpression] BinaryExpression',value , leftValue, rightValue);
                    value.Out=null; //保存中间值

                    switch(value.Operator)
                    {
                        case '-':
                            value.Out=this.Algorithm.Subtract(leftValue,rightValue);
                            break;
                        case '*':
                            value.Out=this.Algorithm.Multiply(leftValue,rightValue);
                            break;
                        case '/':
                            value.Out=this.Algorithm.Divide(leftValue,rightValue)
                            break;
                        case '+':
                            value.Out=this.Algorithm.Add(leftValue,rightValue);
                            break;
                        case '>':
                            value.Out=this.Algorithm.GT(leftValue,rightValue);
                            break;
                        case '>=':
                            value.Out=this.Algorithm.GTE(leftValue,rightValue);
                            break;
                        case '<':
                            value.Out=this.Algorithm.LT(leftValue,rightValue);
                            break;
                        case '<=':
                            value.Out=this.Algorithm.LTE(leftValue,rightValue);
                            break;
                        case '==':
                            value.Out=this.Algorithm.EQ(leftValue,rightValue);
                            break;
                    }

                    if (JS_EXECUTE_DEBUG_LOG) console.log('[JSExecute::VisitBinaryExpression] BinaryExpression',value);
                }
                else if (value.Type==Syntax.LogicalExpression)
                {
                    let leftValue=this.GetNodeValue(value.Left);
                    let rightValue=this.GetNodeValue(value.Right);

                    if (JS_EXECUTE_DEBUG_LOG) console.log('[JSExecute::VisitBinaryExpression] LogicalExpression',value , leftValue, rightValue);
                    value.Out=null; //保存中间值

                    switch(value.Operator)
                    {
                        case '&&':
                        case 'AND':
                            value.Out=this.Algorithm.And(leftValue,rightValue);
                            break;
                        case '||':
                        case 'OR':
                            value.Out=this.Algorithm.Or(leftValue,rightValue);
                            break;
                    }

                    if (JS_EXECUTE_DEBUG_LOG) console.log('[JSExecute::VisitBinaryExpression] LogicalExpression',value);
                }
                
                node=temp;
            }
        }

        return node.Out;

    }

    this.GetNodeValue=function(node)
    {
        switch(node.Type)
        {
            case Syntax.Literal:    //数字
                return node.Value;
            case Syntax.UnaryExpression:
                if (node.Operator=='-') 
                {
                    let value=this.GetNodeValue(node.Argument);
                    return this.Algorithm.Subtract(0,value);
                }
                return node.Argument.Value;
            case Syntax.Identifier:
                let value=this.ReadVariable(node.Name,node);
                return value;
            case Syntax.BinaryExpression:
            case Syntax.LogicalExpression:
                return node.Out;
            case Syntax.CallExpression:
                return this.VisitCallExpression(node);
            default:
                this.ThrowUnexpectedNode(node);
        }
    }

    this.ThrowUnexpectedNode=function(node,message)
    {
        let marker=node.Marker;
        let msg=message || "执行异常";
       
        return this.ErrorHandler.ThrowError(marker.Index,marker.Line,marker.Column,msg);
       
    }

    this.ThrowError=function()
    {

    }
}

//对外导出类
function JSComplier()
{
    
}


//词法分析
JSComplier.Tokenize=function(code)
{
    console.log('[JSComplier.Tokenize]', code);
    let tokenizer=new Tokenizer(code);
    let tokens=[];
    try
    {
        while(true)
        {
            let token=tokenizer.GetNextToken();
            if (!token) break;

            tokens.push(token);
        }
    }
    catch(e)
    {

    }

    return tokens;
}

//语法解析 生成抽象语法树(Abstract Syntax Tree)
JSComplier.Parse=function(code)
{
    console.log('[JSComplier.Parse]',code);

    let parser=new JSParser(code);
    parser.Initialize();
    let program=parser.ParseScript();
    let ast=program;
    return ast;
}

/*
    执行
    option.Symbol=股票代码
    option.Name=股票名称
    option.Data=这个股票的ChartData
    option.Right=复权
    option.MaxReqeustDataCount=请求数据的最大个数
*/

function timeout(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }

  
JSComplier.Execute=function(code,option,errorCallback)
{
    //异步调用
    var asyncExecute= function()
    {
        try
        {
            console.log('[JSComplier.Execute]',code,option);

            console.log('[JSComplier.Execute] parser .....');
            let parser=new JSParser(code);
            parser.Initialize();
            let program=parser.ParseScript(); 
            
            let ast=program;
            console.log('[JSComplier.Execute] parser finish.', ast);

            console.log('[JSComplier.Execute] execute .....');
            let execute=new JSExecute(ast,option);
            execute.JobList=parser.Node.GetDataJobList();
            execute.JobList.push(JS_EXECUTE_JOB_ID.JOB_RUN_SCRIPT);

            let result=execute.Execute();

        }catch(error)
        {
            console.log(error);

            if (errorCallback) errorCallback(error);
        }
    }

    asyncExecute();

    console.log('[JSComplier.Execute] async execute.');
}

JSComplier.SetDomain = function (domain, cacheDomain) 
{
    if (domain) g_JSComplierResource.Domain = domain;
    if (cacheDomain) g_JSComplierResource.CacheDomain = cacheDomain;
}


/* 测试例子
var code1='VARHIGH:IF(VAR1<=REF(HH,-1),REF(H,BARSLAST(VAR1>=REF(HH,1))),DRAWNULL),COLORYELLOW;';
var code2='VAR1=((SMA(MAX((CLOSE - LC),0),3,1) / SMA(ABS((CLOSE - LC)),3,1)) * 100);';
var code3='mm1=1-2*-9+20;';

console.log(code1+code2)
var tokens=JSComplier.Tokenize(code1+code2);
var ast=JSComplier.Parse(code2+code1);

console.log(ast);
*/


module.exports =
{
    JSCommonComplier:
    {
        JSComplier: JSComplier
    }
};