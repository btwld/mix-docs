/// RemixTextField Example
///
/// Text input with label, helper text, and a focused border state.
/// Inspired by Lemonsqueezy Wedges.

library;

import 'package:flutter/material.dart';
import 'package:mix_docs_preview/helpers.dart';
import 'package:remix/remix.dart';

void main() {
  runMixApp(const Example());
}

class Example extends StatefulWidget {
  const Example({super.key});

  @override
  State<Example> createState() => _ExampleState();
}

class _ExampleState extends State<Example> {
  final controller = TextEditingController();

  @override
  void dispose() {
    controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: 300,
      child: RemixTextField(
        controller: controller,
        hintText: 'Placeholder',
        label: 'Label',
        helperText: 'Required field',
        style: style,
      ),
    );
  }

  RemixTextFieldStyle get style {
    return RemixTextFieldStyle()
        .color(Colors.grey.shade800)
        .backgroundColor(Colors.white)
        .borderRadiusAll(const Radius.circular(8.0))
        .height(44)
        .paddingX(12)
        .spacing(8)
        .label(
          TextStyler()
              .color(Colors.blueGrey.shade900)
              .fontWeight(FontWeight.w500),
        )
        .helperText(
          TextStyler()
              .fontWeight(FontWeight.w300)
              .color(Colors.blueGrey.shade600),
        )
        .hintColor(Colors.blueGrey.shade500)
        .shadow(
          BoxShadowMix().blurRadius(1).color(Colors.black12).offset(x: 0, y: 1),
        )
        .border(BoxBorderMix.all(BorderSideMix(color: Colors.grey.shade300)))
        .onFocused(
          RemixTextFieldStyle().border(
            BoxBorderMix.all(
              BorderSideMix()
                  .color(Colors.deepPurpleAccent)
                  .width(3)
                  .strokeAlign(BorderSide.strokeAlignCenter),
            ),
          ),
        );
  }
}
