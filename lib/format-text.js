/**
 * @param  {string} text
 * @param  {string} terminalWidth
 * @returns {string}
 */
module.exports = function formatText(text, terminalWidth) {
  /**Terminal width to cover in percentage */
  const TERMINAL_WIDTH_TO_COVER = 75;

  let termCol = terminalWidth / 100;

  /** if text only covers <= <TERMINAL_WIDTH_TO_COVER> %  of the terminal width */
  if (text.length < termCol * TERMINAL_WIDTH_TO_COVER) return text;

  let formattedString = "";

  for (let i = 0; i < text.length; i++) {
    /**After <TERMINAL_WIDTH_TO_COVER> characters add \n */
    if (formattedString.length % (termCol * 70) === 0)
      formattedString = formattedString.concat(`\n`);

    formattedString = formattedString.concat(text.charAt(i));
  }
  return formattedString.trim();
}
