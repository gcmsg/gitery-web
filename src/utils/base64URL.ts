
function unescape(str: string) {
  return (str + '==='.slice((str.length + 3) % 4))
    .replace(/-/g, '+')
    .replace(/_/g, '/');
}

function escape(str: string) {
  return str.replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
}

function encode(str: string, encoding?: 'utf8' | 'ascii' | 'utf-8' | 'utf16le' | 'ucs2' | 'ucs-2' | 'base64' | 'latin1' | 'binary' | 'hex' | undefined) {
  return escape(Buffer.from(str, encoding || 'utf8').toString('base64'));
}

function decode(str: string, encoding?: 'utf8' | 'ascii' | 'utf-8' | 'utf16le' | 'ucs2' | 'ucs-2' | 'base64' | 'latin1' | 'binary' | 'hex' | undefined) {
  return Buffer.from(unescape(str), 'base64').toString(encoding || 'utf8');
}

export default {
  unescape,
  escape,
  encode,
  decode,
};
