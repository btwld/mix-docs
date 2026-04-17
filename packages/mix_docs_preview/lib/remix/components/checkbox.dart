/// RemixCheckbox Example
///
/// Stateful checkbox with filled-on-select styling.
/// Inspired by Carbon — https://carbondesignsystem.com/components/checkbox/usage/

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
  bool _isChecked = true;

  @override
  Widget build(BuildContext context) {
    return RemixCheckbox(
      selected: _isChecked,
      onChanged: (value) {
        setState(() {
          _isChecked = value ?? false;
        });
      },
      style: style,
    );
  }

  RemixCheckboxStyle get style {
    return RemixCheckboxStyle()
        .size(24, 24)
        .icon(IconStyler().size(20).color(Colors.white))
        .onSelected(
          RemixCheckboxStyle().color(Colors.grey.shade900),
        )
        .borderRadiusAll(const Radius.circular(3))
        .border(
          BoxBorderMix.all(
            BorderSideMix().color(Colors.black87).width(2),
          ),
        );
  }
}
