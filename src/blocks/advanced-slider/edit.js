/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
import { useSelect } from '@wordpress/data';

const TEMPLATE = [[ 'task-2025/slide-item' ]];

export default function Edit( { clientId, attributes, setAttributes } ) {
	const blockProps = useBlockProps( { className: 'slider-wrapper' } );

	const childCount = useSelect( ( select ) => {
		const { getBlockOrder } = select( 'core/block-editor' );
		const order = getBlockOrder( clientId ) || [];
		return order.length;
	}, [ clientId ] );

	if ( attributes.slideCount !== childCount ) {
		setAttributes( { slideCount: childCount } );
	}

	return (
		<div { ...blockProps }>
			{ attributes.showArrows && childCount > 5 && (
				<div className="slider-nav" aria-hidden="true">
					<span className="prev">‹</span>
					<span className="next">›</span>
				</div>
			) }
			<div className="slider-grid">
				<InnerBlocks
					template={ TEMPLATE }
					allowedBlocks={ [ 'task-2025/slide-item' ] }
					renderAppender={ InnerBlocks.ButtonBlockAppender }
				/>
			</div>
		</div>
	);
}
