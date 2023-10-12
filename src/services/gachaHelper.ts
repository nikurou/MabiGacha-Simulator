export class gachaHelper {
  /**
   * Given a string, if it has a color hex code within it, pull that code out.
   *
   * @param text <string> - "Fixed Color Dye Ampoule #ffaaaa"
   * @returns hexCode <string> - "#ffaaaa"
   */
  public static getColorHexCode(text: string) {
    const match = text.match(/#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})/);
    if (match) {
      return match[0];
    }
  }
}
