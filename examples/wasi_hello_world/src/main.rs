use kimono::*;
use std::io;
use std::io::*;

const STYLE: Style = Style::new()
    .padding_top(1)
    .padding_left(1)
    .padding_right(2)
    .padding_bottom(3)
    .border(1)
    .border_style(BORDER_STYLE_OUTLINE)
    .border_color(0xddae74)
    .border_background(0xbc5633)
    .color(0xebdeb8)
    .background(0x407955);

fn main() {
    colored::control::set_override(true);
    clear_screen();
    STYLE.render_at_position(10, 3, "type something");
    print!("\n\r");
    let mut input = String::new();
    io::stdin().read_line(&mut input).expect("error: unable to read user input");
    println!("{}",input);
}