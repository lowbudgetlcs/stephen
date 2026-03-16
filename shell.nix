{ pkgs ? import <nixpkgs> {} }:

pkgs.mkShell {
    buildInputs = with pkgs; [
      nodejs_22
    ];
    env = {
      TEST="Hello there...";
      PROJ_HOME="~/code/dev/lblcs/stephen";
    };
    shellHook = ''
      alias home="cd $PROJ_HOME"
      cowsay $TEST
    '';
}
