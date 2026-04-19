/// RemixAccordion Example
///
/// Collapsible FAQ list built from [RemixAccordion] items inside a group.
/// Inspired by alignui — https://www.alignui.com/docs/v1.2/ui/accordion

library;

import 'package:flutter/material.dart';
import 'package:mix_docs_preview/helpers.dart';
import 'package:remix/remix.dart';

void main() {
  runMixApp(const Example());
}

class Example extends StatelessWidget {
  const Example({super.key});

  @override
  Widget build(BuildContext context) {
    return FortalScope(child: const AccordionPreview());
  }
}

class AccordionPreview extends StatefulWidget {
  const AccordionPreview({super.key});

  @override
  State<AccordionPreview> createState() => _AccordionPreviewState();
}

class _AccordionPreviewState extends State<AccordionPreview> {
  final controller = RemixAccordionController<String>(min: 0, max: 1);

  @override
  void dispose() {
    controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: 400,
      child: FlexBox(
        style: FlexBoxStyler()
            .direction(.vertical)
            .spacing(24)
            .mainAxisSize(.min),
        children: [
          RemixAccordionGroup(
            controller: controller,
            child: ColumnBox(
              style: FlexBoxStyler().spacing(16),
              children: [
                RemixAccordion(
                  value: 'accordion1',
                  title: 'How do I update my account information?',
                  style: FortalAccordionStyle.base(),
                  child: const Text(
                    'Insert the accordion description here. It would look better as two lines of text.',
                  ),
                ),
                RemixAccordion(
                  value: 'accordion2',
                  title: 'What payment methods are accepted?',
                  style: FortalAccordionStyle.base(),
                  child: const Text(
                    'Major credit and debit cards like Visa, MasterCard, and American Express, as well as digital payment options like PayPal and Apple Pay.',
                  ),
                ),
                RemixAccordion(
                  value: 'accordion3',
                  title: 'How can I track my order?',
                  style: FortalAccordionStyle.base(),
                  child: const Text(
                    'You can track your order status in the "My Orders" section of your account.',
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  RemixAccordionStyle get itemStyle {
    return RemixAccordionStyle()
        .content(BoxStyler().padding(.horizontal(16).top(8)))
        .wrap(.clipRRect(borderRadius: .circular(8)))
        .padding(.horizontal(16).vertical(14))
        .borderRadius(.circular(8))
        .onHovered(RemixAccordionStyle().color(Colors.grey.shade100))
        .color(Colors.white)
        .border(.color(Colors.grey.shade300).width(1))
        .trigger(
          FlexBoxStyler()
              .direction(.horizontal)
              .mainAxisAlignment(.spaceBetween)
              .spacing(12),
        )
        .leadingIcon(.color(Colors.grey.shade700).size(20))
        .title(
          .color(Colors.grey.shade900).fontWeight(FontWeight.w500).fontSize(14),
        )
        .trailingIcon(.color(Colors.grey.shade700).size(20));
  }
}
