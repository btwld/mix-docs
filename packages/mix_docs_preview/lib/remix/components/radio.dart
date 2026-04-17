/// RemixRadio Example
///
/// Radio group with a ring-on-select indicator and hover glow.
/// Inspired by olist — https://designsystem.olist.io/latest/components/radio

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
  String? _selectedValue;

  @override
  Widget build(BuildContext context) {
    return RemixRadioGroup<String>(
      groupValue: _selectedValue,
      onChanged: (value) {
        setState(() {
          _selectedValue = value;
        });
      },
      child: Column(
        crossAxisAlignment: .center,
        spacing: 16,
        mainAxisSize: .min,
        children: [
          Row(
            spacing: 8,
            mainAxisSize: .min,
            children: [
              RemixRadio<String>(value: 'option1', style: style),
              const Text('Option 1'),
            ],
          ),
          Row(
            spacing: 8,
            mainAxisSize: .min,
            children: [
              RemixRadio<String>(value: 'option2', style: style),
              const Text('Option 2'),
            ],
          ),
        ],
      ),
    );
  }

  RemixRadioStyle get style {
    return RemixRadioStyle()
        .borderRadiusAll(const Radius.circular(30))
        .size(22, 22)
        .border(
          BoxBorderMix.all(
            BorderSideMix()
                .color(Colors.blueGrey.shade100)
                .width(2.4)
                .strokeAlign(BorderSide.strokeAlignInside),
          ),
        )
        .onHovered(
          RemixRadioStyle().shadow(
            BoxShadowMix()
                .color(Colors.blueGrey.shade50.withValues(alpha: 0.7))
                .blurRadius(0)
                .spreadRadius(9),
          ),
        )
        .onPressed(
          RemixRadioStyle().border(
            BoxBorderMix.all(
              BorderSideMix()
                  .color(Colors.blueGrey.shade100)
                  .width(6)
                  .strokeAlign(BorderSide.strokeAlignInside),
            ),
          ),
        )
        .onSelected(
          RemixRadioStyle().border(
            BoxBorderMix.all(
              BorderSideMix()
                  .color(Colors.blueAccent.shade700)
                  .width(6)
                  .strokeAlign(BorderSide.strokeAlignInside),
            ),
          ),
        );
  }
}
