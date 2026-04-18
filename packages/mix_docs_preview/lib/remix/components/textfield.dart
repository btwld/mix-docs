/// RemixTextField Example
///
/// Fortal text field with label and helper text.

library;

import 'package:flutter/material.dart';
import 'package:mix_docs_preview/helpers.dart';
import 'package:remix/remix.dart';

void main() {
  runMixApp(FortalScope(child: const Example()));
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
        style: FortalTextFieldStyles.surface(),
      ),
    );
  }
}
